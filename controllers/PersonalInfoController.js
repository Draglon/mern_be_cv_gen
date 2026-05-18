import { ALLOWED_LOCALES } from '../lib/constants/index.js';
import { PERSONAL_INFO_LOCALE_FIELDS } from '../lib/constants/personalInfo.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';

import PersonalInfoModel from '../models/PersonalInfo.js';
import UserModel from '../models/User.js';

export const fetch = async (req, res) => {
  try {
    const personalInfoId = req.params.id;

    const personalInfo = await PersonalInfoModel.findOne({
      _id: personalInfoId,
      userId: req.userId,
    }).lean();

    if (!personalInfo) {
      return getError(res, 404, { message: "Personal info not found!" });
    }

    return getResponse(res, 200, personalInfo);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed fetch personal info!",
      error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeLocale } = req.body;

    if (!ALLOWED_LOCALES.includes(resumeLocale)) {
      return getError(res, 400, { message: "Invalid locale!" });
    }

    const existing = await PersonalInfoModel.findOne({ userId });
    if (existing) {
      return getError(res, 400, {
        message: "Personal info already exists!",
      });
    }

    const personalInfo = new PersonalInfoModel();

    PERSONAL_INFO_LOCALE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        const value =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : req.body[field];

        personalInfo.set(`${field}.${resumeLocale}`, value);
      }
    });
    personalInfo.set("userId", userId);

    const savedData = await personalInfo.save();

    await UserModel.updateOne(
      { _id: userId },
      { $set: { personalInfoId: savedData._id } }
    );

    return getResponse(res, 200, savedData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed create personal info!",
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const personalInfoId = req.params.id;
    const { resumeLocale } = req.body;

    if (!resumeLocale || !ALLOWED_LOCALES.includes(resumeLocale)) {
      return getError(res, 400, { message: "Invalid locale!" });
    }

    const updateData = {};

    PERSONAL_INFO_LOCALE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        const value =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : req.body[field];

        updateData[`${field}.${resumeLocale}`] = value;
      }
    });

    if (Object.keys(updateData).length === 0) {
      return getError(res, 400, { message: "No fields to update!" });
    }

    const savedData = await PersonalInfoModel.findOneAndUpdate(
      {
        _id: personalInfoId,
        userId: req.userId,
      },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!savedData) {
      return getError(res, 404, {
        message: "Personal info not found or access denied!",
      });
    }

    return getResponse(res, 200, savedData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed update personal info!",
      error,
    });
  }
};
