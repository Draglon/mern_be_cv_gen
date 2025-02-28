import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  // avatarUrl: String,
  personalInfoId: String,
  personalHobbiesId: String,
  personalLanguagesId: String,
  personalExperienceId: String,
  personalEducationId: String,
  personalCoursesId: String,
  personalSkillsId: String,
  personalToolsId: String,
},
{
  timestamps: true,
});

export default mongoose.model('User', UserSchema);
