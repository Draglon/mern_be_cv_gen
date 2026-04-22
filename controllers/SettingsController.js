import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';
import checkEmailExists from '../utils/checkEmailExists.js';
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
    const userId = req.params.userId;
    const userName = req.query.userName;
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
    const { userId } = req.params;
    const user = await UserModel.findById(userId);

    if (!user) {
      return getError(res, 404, { message: 'User not found!' });
    }

    const isEmailExists = await checkEmailExists(newEmail);
    const isPasswordMatch = await checkPassword(password, user);

    if (isEmailExists) {
      return getError(res, 401, { message: 'Email already exists!' });
    }

    if (!isPasswordMatch) {
      return getError(res, 409, { message: 'Incorrect password!' });
    }

    await UserModel.findByIdAndUpdate(userId, { email: newEmail });

    getResponse(res, 200, { success: true });
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed to update email!', error });
  }
}

export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return getError(res, 404, { message: 'User not found!' });
    }

    const isCurrentPasswordMatch = await checkPassword(currentPassword, user);

    if (!isCurrentPasswordMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    const passwordHash = await getPasswordHash(newPassword);

    await UserModel.findByIdAndUpdate(userId, { passwordHash });

    getResponse(res, 200, { success: true });
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed to update password!', error });
  }
}