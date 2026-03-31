import UserModel from "../models/User.js";
import PersonalInfo from "../models/PersonalInfo.js";
import PersonalHobbies from "../models/PersonalHobbies.js";
import PersonalLanguages from "../models/PersonalLanguages.js";
import PersonalExperience from "../models/PersonalExperience.js";
import PersonalEducation from "../models/PersonalEducation.js";
import PersonalCourses from "../models/PersonalCourses.js";
import PersonalSkills from "../models/PersonalSkills.js";
import PersonalTools from "../models/PersonalTools.js";

export const fetch = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Данные не найдены.',
      })
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
      personalInfo = await PersonalInfo.findById(user.personalInfoId);
    }
    if (user.personalHobbiesId) {
      personalHobbies = await PersonalHobbies.findById(user.personalHobbiesId);
    }
    if (user.personalLanguagesId) {
      personalLanguages = await PersonalLanguages.findById(user.personalLanguagesId);
    }
    if (user.personalExperienceId) {
      personalExperience = await PersonalExperience.findById(user.personalExperienceId);
    }
    if (user.personalEducationId) {
      personalEducation = await PersonalEducation.findById(user.personalEducationId);
    }
    if (user.personalCoursesId) {
      personalCourses = await PersonalCourses.findById(user.personalCoursesId);
    }
    if (user.personalSkillsId) {
      personalSkills = await PersonalSkills.findById(user.personalSkillsId);
    }
    if (user.personalToolsId) {
      personalTools = await PersonalTools.findById(user.personalToolsId);
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
    console.log(error)

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}