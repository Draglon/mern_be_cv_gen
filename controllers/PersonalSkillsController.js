import mongoose from "mongoose";

import { ALLOWED_LOCALES } from '../lib/constants/index.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';

import PersonalSkillsModel from '../models/PersonalSkills.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  try {
    const userId = req.userId;
    const personalSkillsId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personalSkillsId)) {
      return getError(res, 400, { message: 'Invalid ID!' });
    }

    const personalSkills = await PersonalSkillsModel.findById(personalSkillsId);

    if (!personalSkills) {
      return getError(res, 404, { message: 'Personal skills not found!' });
    }

    if (
      personalSkills.userId &&
      personalSkills.userId.toString() !== userId
    ) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    return getResponse(res, 200, personalSkills);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed fetch personal skills!', error });
  }
}

export const create = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const { sectionTitle, skills, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    if (skills && !Array.isArray(skills)) {
      return getError(res, 400, { message: "Skills must be an array!" });
    }

    const existing = await PersonalSkillsModel.findOne({ userId });
    if (existing) {
      return getError(res, 400, { message: "Skills already exist!" });
    }

    const personalSkills = new PersonalSkillsModel();
    personalSkills.set(`sectionTitle.${locale}`, sectionTitle);
    personalSkills.set(`skills.${locale}`, skills);
    personalSkills.set("userId", userId);

    const savedData = await personalSkills.save({ session });

    await UserModel.updateOne(
      { _id: userId },
      { $set: { personalSkillsId: savedData._id } },
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
      message: "Server error! Failed create personal skills!",
      error,
    });
  }
}

export const update = async (req, res) => {
  try {
    const userId = req.userId;
    const personalSkillsId = req.params.id;
    const { sectionTitle, skills, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    const personalSkills = await PersonalSkillsModel.findById(personalSkillsId);

    if (!personalSkills) {
      return getError(res, 404, { message: 'Personal skills not found!' });
    }

    if (!personalSkills.userId || personalSkills.userId.toString() !== userId) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    const updateData = {};

    if (sectionTitle !== undefined) {
      updateData[`sectionTitle.${locale}`] = sectionTitle;
    }

    if (skills !== undefined) {
      if (!Array.isArray(skills)) {
        return getError(res, 400, { message: "Skills must be an array!" });
      }
      updateData[`skills.${locale}`] = skills;
    }

    if (Object.keys(updateData).length === 0) {
      return getError(res, 400, { message: "No data to update!" });
    }

    const savedData = await PersonalSkillsModel.findByIdAndUpdate(
      personalSkillsId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return getResponse(res, 200, savedData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed update personal skills!",
      error,
    });
  }
}
