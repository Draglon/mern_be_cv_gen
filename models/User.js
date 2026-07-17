import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  avatarUrl: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    trim: true,
    default: "",
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
  },
  userName: {
    type: String,
    trim: true,
    minlength: 2,
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
  resume: {
    currentStep: {
      type: Number,
      default: 0,
    },
    isCreated: {
      type: Boolean,
      default: false,
    }
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
  personalExperiencesId: {
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
