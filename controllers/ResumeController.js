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

export const fetch = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return getError(res, 404, { message: 'User not found!' });
    }

    let personalInfo = null;
    let personalHobbies = null;
    let personalLanguages = null;
    let personalExperience = null;
    let personalEducation = null;
    let personalCourses = null;
    let personalSkills = null;
    let personalTools = null;

    if (user.personalInfoId) {
      personalInfo = await PersonalInfoModel.findById(user.personalInfoId);
    }
    if (user.personalHobbiesId) {
      personalHobbies = await PersonalHobbiesModel.findById(user.personalHobbiesId);
    }
    if (user.personalLanguagesId) {
      personalLanguages = await PersonalLanguagesModel.findById(user.personalLanguagesId);
    }
    if (user.personalExperienceId) {
      personalExperience = await PersonalExperienceModel.findById(user.personalExperienceId);
    }
    if (user.personalEducationId) {
      personalEducation = await PersonalEducationModel.findById(user.personalEducationId);
    }
    if (user.personalCoursesId) {
      personalCourses = await PersonalCoursesModel.findById(user.personalCoursesId);
    }
    if (user.personalSkillsId) {
      personalSkills = await PersonalSkillsModel.findById(user.personalSkillsId);
    }
    if (user.personalToolsId) {
      personalTools = await PersonalToolsModel.findById(user.personalToolsId);
    }

    const resumeData = {
      personalInfo: {
        sectionTitle: personalInfo?.sectionTitle,
        userUrl: personalInfo?.userUrl,
        firstName: personalInfo?.firstName,
        lastName: personalInfo?.lastName,
        about: personalInfo?.about,
        email: personalInfo?.email,
        address: personalInfo?.address,
        phoneNumber: personalInfo?.phoneNumber,
        birthday: personalInfo?.birthday,
        linkedIn: personalInfo?.linkedIn,
        telegram: personalInfo?.telegram,
        portfolio: personalInfo?.portfolio,
      },
      personalHobbies: {
        sectionTitle: personalHobbies?.sectionTitle,
        hobbies: personalHobbies?.hobbies,
      },
      personalLanguages: {
        sectionTitle: personalLanguages?.sectionTitle,
        languages: personalLanguages?.languages,
      },
      personalExperience: {
        sectionTitle: personalExperience?.sectionTitle,
        experience: personalExperience?.experience,
      },
      personalEducation: {
        sectionTitle: personalEducation?.sectionTitle,
        education: personalEducation?.education,
      },
      personalCourses: {
        sectionTitle: personalCourses?.sectionTitle,
        courses: personalCourses?.courses,
      },
      personalSkills: {
        sectionTitle: personalSkills?.sectionTitle,
        skills: personalSkills?.skills,
      },
      personalTools: {
        sectionTitle: personalTools?.sectionTitle,
        tools: personalTools?.tools,
      },
    };

    res.json(resumeData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error!', error });
  }
}