import getError from '../utils/getError.js';

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

    getError(res, 200, { message: 'The user account has been successfully deleted!' });
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error!', error });
  }
}
