import mongoose from "mongoose";

import { ALLOWED_LOCALES } from '../lib/constants/index.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';

import PersonalLanguagesModel from '../models/PersonalLanguages.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  try {
    const userId = req.userId;
    const personalLanguagesId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personalLanguagesId)) {
      return getError(res, 400, { message: 'Invalid ID' });
    }

    const personalLanguages = await PersonalLanguagesModel.findById(personalLanguagesId);

    if (!personalLanguages) {
      return getError(res, 404, { message: 'Personal languages not found!' });
    }

    if (
      personalLanguages.userId &&
      personalLanguages.userId.toString() !== userId
    ) {
      return getError(res, 403, { message: 'Access denied' });
    }

    return getResponse(res, 200, personalHobbies);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed fetch personal languages!', error });
  }
}

export const create = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const { sectionTitle, languages, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale' });
    }

    if (languages && !Array.isArray(languages)) {
      return getError(res, 400, { message: "Languages must be an array" });
    }

    const existing = await PersonalLanguagesModel.findOne({ userId });
    if (existing) {
      return getError(res, 400, { message: "Languages already exist" });
    }

    const personalLanguages = new PersonalLanguagesModel();
    personalLanguages.set(`sectionTitle.${locale}`, sectionTitle);
    personalLanguages.set(`languages.${locale}`, languages);
    personalLanguages.set("userId", userId);

    const saved = await personalLanguages.save({ session });

    await UserModel.updateOne(
      { _id: userId },
      { $set: { personalLanguagesId: saved._id } },
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
      message: "Server error! Failed create personal languages!",
      error,
    });
  }
}

export const update = async (req, res) => {
  try {
    const userId = req.userId;
    const personalLanguagesId = req.params.id;
    const { sectionTitle, languages, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale' });
    }

    const personalLanguages = await PersonalLanguagesModel.findById(personalLanguagesId);

    if (!personalLanguages) {
      return getError(res, 404, { message: 'Personal languages not found!' });
    }

    if (!personalLanguages.userId || personalLanguages.userId.toString() !== userId) {
      return getError(res, 403, { message: 'Access denied' });
    }

    const updateData = {};

    if (sectionTitle !== undefined) {
      updateData[`sectionTitle.${locale}`] = sectionTitle;
    }

    if (languages !== undefined) {
      if (!Array.isArray(languages)) {
        return getError(res, 400, { message: "Languages must be an array" });
      }
      updateData[`languages.${locale}`] = languages;
    }

    if (Object.keys(updateData).length === 0) {
      return getError(res, 400, { message: "No data to update" });
    }

    const personalLanguagesData = await PersonalLanguagesModel.findByIdAndUpdate(
      personalLanguagesId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return getResponse(res, 200, personalLanguagesData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed update personal languages!",
      error,
    });
  }
}
