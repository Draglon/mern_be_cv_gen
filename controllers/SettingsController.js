import getError from '../utils/getError.js';

import UserModel from "../models/User.js";
import PersonalInfo from "../models/PersonalInfo.js";
import PersonalHobbies from "../models/PersonalHobbies.js";
import PersonalLanguages from "../models/PersonalLanguages.js";
import PersonalExperience from "../models/PersonalExperience.js";
import PersonalEducation from "../models/PersonalEducation.js";
import PersonalCourses from "../models/PersonalCourses.js";
import PersonalSkills from "../models/PersonalSkills.js";
import PersonalTools from "../models/PersonalTools.js";

export const removeAccount = async (req, res) => {
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
      await PersonalInfo.findByIdAndDelete(user.personalInfoId);
    }
    if (user.personalHobbiesId) {
      await PersonalHobbies.findByIdAndDelete(user.personalHobbiesId);
    }
    if (user.personalLanguagesId) {
      await PersonalLanguages.findByIdAndDelete(user.personalLanguagesId);
    }
    if (user.personalExperienceId) {
      await PersonalExperience.findByIdAndDelete(user.personalExperienceId);
    }
    if (user.personalEducationId) {
      await PersonalEducation.findByIdAndDelete(user.personalEducationId);
    }
    if (user.personalCoursesId) {
      await PersonalCourses.findByIdAndDelete(user.personalCoursesId);
    }
    if (user.personalSkillsId) {
      await PersonalSkills.findByIdAndDelete(user.personalSkillsId);
    }
    if (user.personalToolsId) {
      await PersonalTools.findByIdAndDelete(user.personalToolsId);
    }

    getError(res, 200, { message: 'The user account has been successfully deleted!' });
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error!', error });
  }
}
