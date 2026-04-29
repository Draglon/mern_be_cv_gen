import { MIN_PASSWORD_LENGTH } from '../lib/constants/index.js';
import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';
import checkPassword from '../utils/checkPassword.js';
import getPasswordHash from '../utils/getPasswordHash.js';

import UserModel from "../models/User.js";
import PersonalInfoModel from "../models/PersonalInfo.js";
import PersonalHobbiesModel from "../models/PersonalHobbies.js";
import PersonalLanguagesModel from "../models/PersonalLanguages.js";
import PersonalExperienceModel from "../models/PersonalExperience.js";
import PersonalEducationModel from "../models/PersonalEducation.js";
import PersonalCoursesModel from "../models/PersonalCourses.js";
import PersonalSkillsModel from "../models/PersonalSkills.js";
import PersonalToolsModel from "../models/PersonalTools.js";

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const userName = req.body.userName;
    const user = await UserModel.findById(userId);

    if (!user) {
      return getError(res, 404, { message: 'User not found!' });
    }

    if (user.userName !== userName) {
      return getError(res, 403, { message: 'Username is not correct!' });
    }

    await UserModel.findByIdAndDelete(userId);

    if (user.personalInfoId) {
      await PersonalInfoModel.findByIdAndDelete(user.personalInfoId);
    }
    if (user.personalHobbiesId) {
      await PersonalHobbiesModel.findByIdAndDelete(user.personalHobbiesId);
    }
    if (user.personalLanguagesId) {
      await PersonalLanguagesModel.findByIdAndDelete(user.personalLanguagesId);
    }
    if (user.personalExperienceId) {
      await PersonalExperienceModel.findByIdAndDelete(user.personalExperienceId);
    }
    if (user.personalEducationId) {
      await PersonalEducationModel.findByIdAndDelete(user.personalEducationId);
    }
    if (user.personalCoursesId) {
      await PersonalCoursesModel.findByIdAndDelete(user.personalCoursesId);
    }
    if (user.personalSkillsId) {
      await PersonalSkillsModel.findByIdAndDelete(user.personalSkillsId);
    }
    if (user.personalToolsId) {
      await PersonalToolsModel.findByIdAndDelete(user.personalToolsId);
    }

    getResponse(res, 200, { message: 'The user account has been successfully deleted!', success: true });
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error!', error });
  }
}

export const updateUserEmail = async (req, res) => {
  try {
    const { newEmail, password } = req.body;
    const { userId } = req;

    const user = await UserModel.findById(userId).select("+passwordHash");

    if (!user) {
      return getError(res, 404, { message: "User not found!" });
    }

    if (!newEmail) {
      return getError(res, 400, { message: "Email is required!" });
    }

    if (!password) {
      return getError(res, 400, { message: "Password is required!" });
    }

    if (user.email === newEmail) {
      return getError(res, 400, {
        message: "Email is already current",
      });
    }

    const isPasswordMatch = await checkPassword(
      password,
      user.passwordHash
    );

    if (!isPasswordMatch) {
      return getError(res, 400, { message: "Incorrect password!" });
    }

    user.email = newEmail;
    await user.save();

    return getResponse(res, 200, { email: user.email });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return getError(res, 409, { message: "Email already exists!" });
    }

    return getError(res, 500, {
      message: "Server error! Failed to update email!",
      error,
    });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findById(req.userId).select("+passwordHash");

    if (!user) {
      return getError(res, 404, { message: "User not found!" });
    }

    const isCurrentPasswordMatch = await checkPassword(
      currentPassword,
      user.passwordHash
    );

    if (!isCurrentPasswordMatch) {
      return getError(res, 400, {
        code: "INCORRECT_CURRENT_PASSWORD",
        message: "Incorrect current password!",
      });
    }

    if (!newPassword || newPassword.length < MIN_PASSWORD_LENGTH) {
      return getError(res, 400, {
        code: "WEAK_PASSWORD",
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters!`,
      });
    }

    if (currentPassword === newPassword) {
      return getError(res, 400, {
        code: "NEW_PASSWORD_EQUALS_OLD",
        message: "New password must be different!",
      });
    }

    user.passwordHash = await getPasswordHash(newPassword);
    await user.save();

    return getResponse(res, 200, { success: true });
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error! Failed to update password!",
      error,
    });
  }
};