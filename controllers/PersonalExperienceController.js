import mongoose from "mongoose";

import { ALLOWED_LOCALES } from '../lib/constants/index.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';

import PersonalExperiencesModel from '../models/PersonalExperiences.js';
import UserModel from '../models/User.js';

export const fetch = async (req, res) => {
  try {
    const userId = req.userId;
    const personalExperiencesId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personalExperiencesId)) {
      return getError(res, 400, { message: 'Invalid ID!' });
    }

    const personalExperiences = await PersonalExperiencesModel.findById(personalExperiencesId);

    if (!personalExperiences) {
      return getError(res, 404, { message: 'Personal experiences not found!' });
    }

    if (
      personalExperiences.userId &&
      personalExperiences.userId.toString() !== userId
    ) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    return getResponse(res, 200, personalExperiences);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed fetch personal experiences!', error });
  }
}

export const create = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const { sectionTitle, recentPositionsCount, experiences, resumeLocale } = req.body;

    if (!ALLOWED_LOCALES.includes(resumeLocale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    if (experiences && !Array.isArray(experiences)) {
      return getError(res, 400, { message: "Experiences must be an array!" });
    }

    const existing = await PersonalExperiencesModel.findOne({ userId });
    if (existing) {
      return getError(res, 400, { message: "Experiences already exist!" });
    }

    const personalExperiences = new PersonalExperiencesModel();
    personalExperiences.set(`sectionTitle.${resumeLocale}`, sectionTitle);
    personalExperiences.set(`recentPositionsCount.${resumeLocale}`, recentPositionsCount);
    personalExperiences.set(`experiences.${resumeLocale}`, experiences);
    personalExperiences.set("userId", userId);

    const savedData = await personalExperiences.save({ session });

    await UserModel.updateOne(
      { _id: userId },
      { $set: { personalExperiencesId: savedData._id } },
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
      message: "Server error! Failed create personal experiences!",
      error,
    });
  }
}

export const update = async (req, res) => {
  try {
    const userId = req.userId;
    const personalExperiencesId = req.params.id;
    const { sectionTitle, recentPositionsCount, experiences, resumeLocale } = req.body;

    if (!ALLOWED_LOCALES.includes(resumeLocale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    const personalExperiences = await PersonalExperiencesModel.findById(personalExperiencesId);

    if (!personalExperiences) {
      return getError(res, 404, { message: 'Personal experiences not found!' });
    }

    if (!personalExperiences.userId || personalExperiences.userId.toString() !== userId) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    const updateData = {};

    if (sectionTitle !== undefined) {
      updateData[`sectionTitle.${resumeLocale}`] = sectionTitle;
    }

    if (recentPositionsCount !== undefined) {
      updateData[`recentPositionsCount.${resumeLocale}`] = recentPositionsCount;
    }

    if (experiences !== undefined) {
      if (!Array.isArray(experiences)) {
        return getError(res, 400, { message: "Experiences must be an array!" });
      }
      updateData[`experiences.${resumeLocale}`] = experiences;
    }

    if (Object.keys(updateData).length === 0) {
      return getError(res, 400, { message: "No data to update!" });
    }

    const savedData = await PersonalExperiencesModel.findByIdAndUpdate(
      personalExperiencesId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return getResponse(res, 200, savedData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed update personal experiences!",
      error,
    });
  }
}
