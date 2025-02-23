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
},
{
  timestamps: true,
});

export default mongoose.model('User', UserSchema);
