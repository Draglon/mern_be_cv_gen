import mongoose from "mongoose";

import { ALLOWED_LOCALES } from '../lib/constants/index.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';

import PersonalEducationModel from '../models/PersonalEducation.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  try {
    const userId = req.userId;
    const personalEducationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personalEducationId)) {
      return getError(res, 400, { message: 'Invalid ID!' });
    }

    const personalEducation = await PersonalEducationModel.findById(personalEducationId);

    if (!personalEducation) {
      return getError(res, 404, { message: 'Personal education not found!' });
    }

    if (
      personalEducation.userId &&
      personalEducation.userId.toString() !== userId
    ) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    return getResponse(res, 200, personalEducation);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed fetch personal education!', error });
  }
}

export const create = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const { sectionTitle, education, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    if (education && !Array.isArray(education)) {
      return getError(res, 400, { message: "Education must be an array!" });
    }

    const existing = await PersonalEducationModel.findOne({ userId });
    if (existing) {
      return getError(res, 400, { message: "Education already exist!" });
    }

    const personalEducation = new PersonalEducationModel();
    personalEducation.set(`sectionTitle.${locale}`, sectionTitle);
    personalEducation.set(`education.${locale}`, education);
    personalEducation.set("userId", userId);

    const savedData = await personalEducation.save({ session });

    await UserModel.updateOne(
      { _id: userId },
      { $set: { personalEducationId: savedData._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return getResponse(res, 200, savedData);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed create personal education!",
      error,
    });
  }
}

export const update = async (req, res) => {
  try {
    const userId = req.userId;
    const personalEducationId = req.params.id;
    const { sectionTitle, education, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    const personalEducation = await PersonalEducationModel.findById(personalEducationId);

    if (!personalEducation) {
      return getError(res, 404, { message: 'Personal education not found!' });
    }

    if (!personalEducation.userId || personalEducation.userId.toString() !== userId) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    const updateData = {};

    if (sectionTitle !== undefined) {
      updateData[`sectionTitle.${locale}`] = sectionTitle;
    }

    if (education !== undefined) {
      if (!Array.isArray(education)) {
        return getError(res, 400, { message: "Education must be an array!" });
      }
      updateData[`education.${locale}`] = education;
    }

    if (Object.keys(updateData).length === 0) {
      return getError(res, 400, { message: "No data to update!" });
    }

    const savedData = await PersonalEducationModel.findByIdAndUpdate(
      personalEducationId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return getResponse(res, 200, savedData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed update personal education!",
      error,
    });
  }
}
