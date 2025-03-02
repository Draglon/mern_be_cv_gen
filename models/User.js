import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  avatarUrl: {
    type: String,
    default: null,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  personalInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalInfo",
    default: null,
  },
  personalHobbiesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalHobbies",
    default: null,
  },
  personalLanguagesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalLanguages",
    default: null,
  },
  personalExperienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalExperience",
    default: null,
  },
  personalEducationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalEducation",
    default: null,
  },
  personalCoursesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalCourses",
    default: null,
  },
  personalSkillsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalSkills",
    default: null,
  },
  personalToolsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalTools",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('User', UserSchema);
