import mongoose from "mongoose";

import { ALLOWED_LOCALES } from '../lib/constants/index.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';

import PersonalHobbiesModel from '../models/PersonalHobbies.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  try {
    const personalHobbiesId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personalHobbiesId)) {
      return getError(res, 400, { message: 'Invalid ID' });
    }

    const personalHobbies = await PersonalHobbiesModel.findById(personalHobbiesId).lean();

    if (!personalHobbies) {
      return getError(res, 404, { message: 'Personal hobbies not found!' });
    }

    if (
      personalHobbies.userId &&
      personalHobbies.userId.toString() !== req.userId
    ) {
      return getError(res, 403, { message: 'Access denied' });
    }

    return getResponse(res, 200, personalHobbies);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: 'Server error! Failed fetch personal hobbies!',
      error,
    });
  }
};

export const create = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const { sectionTitle, hobbies, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale' });
    }

    if (hobbies && !Array.isArray(hobbies)) {
      return getError(res, 400, { message: "Hobbies must be an array" });
    }

    const existing = await PersonalHobbiesModel.findOne({ userId });
    if (existing) {
      return getError(res, 400, { message: "Hobbies already exist" });
    }

    const personalHobbies = new PersonalHobbiesModel();
    personalHobbies.set(`sectionTitle.${locale}`, sectionTitle);
    personalHobbies.set(`hobbies.${locale}`, hobbies);
    personalHobbies.set("userId", userId);

    const saved = await personalHobbies.save({ session });

    await UserModel.updateOne(
      { _id: userId },
      { $set: { personalHobbiesId: saved._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return getResponse(res, 200, saved);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed create personal hobbies!",
      error,
    });
  }
}

export const update = async (req, res) => {
  try {
    const personalHobbiesId = req.params.id;
    const { sectionTitle, hobbies, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale' });
    }

    const personalHobbies = await PersonalHobbiesModel.findById(personalHobbiesId);

    if (!personalHobbies) {
      return getError(res, 404, { message: 'Personal hobbies not found!' });
    }

    if (!personalHobbies.userId || personalHobbies.userId.toString() !== req.userId) {
      return getError(res, 403, { message: 'Access denied' });
    }

    const updateData = {};

    if (sectionTitle !== undefined) {
      updateData[`sectionTitle.${locale}`] = sectionTitle;
    }

    if (hobbies !== undefined) {
      if (!Array.isArray(hobbies)) {
        return getError(res, 400, { message: "Hobbies must be an array" });
      }
      updateData[`hobbies.${locale}`] = hobbies;
    }

    if (Object.keys(updateData).length === 0) {
      return getError(res, 400, { message: "No data to update" });
    }

    const personalHobbiesData = await PersonalHobbiesModel.findByIdAndUpdate(
      personalHobbiesId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return getResponse(res, 200, personalHobbiesData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed update personal hobbies!",
      error,
    });
  }
}
