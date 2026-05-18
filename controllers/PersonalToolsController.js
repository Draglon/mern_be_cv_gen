import mongoose from "mongoose";

import { ALLOWED_LOCALES } from '../lib/constants/index.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';

import PersonalToolsModel from '../models/PersonalTools.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  try {
    const userId = req.userId;
    const personalToolsId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personalToolsId)) {
      return getError(res, 400, { message: 'Invalid ID!' });
    }

    const personalTools = await PersonalToolsModel.findById(personalToolsId);

    if (!personalTools) {
      return getError(res, 404, { message: 'Personal tools not found!' });
    }

    if (
      personalTools.userId &&
      personalTools.userId.toString() !== userId
    ) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    return getResponse(res, 200, personalTools);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed fetch personal tools!', error });
  }
}

export const create = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const { sectionTitle, tools, resumeLocale } = req.body;

    if (!ALLOWED_LOCALES.includes(resumeLocale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    if (tools && !Array.isArray(tools)) {
      return getError(res, 400, { message: "Tools must be an array!" });
    }

    const existing = await PersonalToolsModel.findOne({ userId });
    if (existing) {
      return getError(res, 400, { message: "Tools already exist!" });
    }

    const personalTools = new PersonalToolsModel();
    personalTools.set(`sectionTitle.${resumeLocale}`, sectionTitle);
    personalTools.set(`tools.${resumeLocale}`, tools);
    personalTools.set("userId", userId);

    const savedData = await personalTools.save({ session });

    await UserModel.updateOne(
      { _id: userId },
      { $set: { personalToolsId: savedData._id } },
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
      message: "Server error! Failed create personal tools!",
      error,
    });
  }
}

export const update = async (req, res) => {
  try {
    const userId = req.userId;
    const personalToolsId = req.params.id;
    const { sectionTitle, tools, resumeLocale } = req.body;

    if (!ALLOWED_LOCALES.includes(resumeLocale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    const personalTools = await PersonalToolsModel.findById(personalToolsId);

    if (!personalTools) {
      return getError(res, 404, { message: 'Personal tools not found!' });
    }

    if (!personalTools.userId || personalTools.userId.toString() !== userId) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    const updateData = {};

    if (sectionTitle !== undefined) {
      updateData[`sectionTitle.${resumeLocale}`] = sectionTitle;
    }

    if (tools !== undefined) {
      if (!Array.isArray(tools)) {
        return getError(res, 400, { message: "Tools must be an array!" });
      }
      updateData[`tools.${resumeLocale}`] = tools;
    }

    if (Object.keys(updateData).length === 0) {
      return getError(res, 400, { message: "No data to update!" });
    }

    const savedData = await PersonalToolsModel.findByIdAndUpdate(
      personalToolsId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return getResponse(res, 200, savedData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed update personal tools!",
      error,
    });
  }
}
