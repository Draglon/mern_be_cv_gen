import mongoose from "mongoose";

import { ALLOWED_LOCALES } from '../lib/constants/index.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';

import PersonalCoursesModel from '../models/PersonalCourses.js';
import UserModel from '../models/User.js';

export const fetch = async (req, res) => {
  try {
    const userId = req.userId;
    const personalCoursesId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personalCoursesId)) {
      return getError(res, 400, { message: 'Invalid ID!' });
    }

    const personalCourses = await PersonalCoursesModel.findById(personalCoursesId);

    if (!personalCourses) {
      return getError(res, 404, { message: 'Personal courses not found!' });
    }

    if (
      personalCourses.userId &&
      personalCourses.userId.toString() !== userId
    ) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    return getResponse(res, 200, personalCourses);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed fetch personal courses!', error });
  }
}

export const create = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const { sectionTitle, courses, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    if (courses && !Array.isArray(courses)) {
      return getError(res, 400, { message: "Courses must be an array!" });
    }

    const existing = await PersonalCoursesModel.findOne({ userId });
    if (existing) {
      return getError(res, 400, { message: "Courses already exist!" });
    }

    const personalCourses = new PersonalCoursesModel();
    personalCourses.set(`sectionTitle.${locale}`, sectionTitle);
    personalCourses.set(`courses.${locale}`, courses);
    personalCourses.set("userId", userId);

    const savedData = await personalCourses.save({ session });

    await UserModel.updateOne(
      { _id: userId },
      { $set: { personalCoursesId: savedData._id } },
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
      message: "Server error! Failed create personal courses!",
      error,
    });
  }
}

export const update = async (req, res) => {
  try {
    const userId = req.userId;
    const personalCoursesId = req.params.id;
    const { sectionTitle, courses, locale } = req.body;

    if (!ALLOWED_LOCALES.includes(locale)) {
      return getError(res, 400, { message: 'Invalid locale!' });
    }

    const personalCourses = await PersonalCoursesModel.findById(personalCoursesId);

    if (!personalCourses) {
      return getError(res, 404, { message: 'Personal courses not found!' });
    }

    if (!personalCourses.userId || personalCourses.userId.toString() !== userId) {
      return getError(res, 403, { message: 'Access denied!' });
    }

    const updateData = {};

    if (sectionTitle !== undefined) {
      updateData[`sectionTitle.${locale}`] = sectionTitle;
    }

    if (courses !== undefined) {
      if (!Array.isArray(courses)) {
        return getError(res, 400, { message: "Courses must be an array!" });
      }
      updateData[`courses.${locale}`] = courses;
    }

    if (Object.keys(updateData).length === 0) {
      return getError(res, 400, { message: "No data to update!" });
    }

    const savedData = await PersonalCoursesModel.findByIdAndUpdate(
      personalCoursesId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return getResponse(res, 200, savedData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed update personal courses!",
      error,
    });
  }
}
