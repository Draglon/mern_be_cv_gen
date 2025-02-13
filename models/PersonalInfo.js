import mongoose from "mongoose";

const PersonalInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  email: String,
  address: String,
  phoneNumber: String,
  birthday: String,
  skype: String,
  linkedIn: String,
  userUrl: String,
},
{
  timestamps: true,
});

const PersonalInfoWithLocaleSchema = new mongoose.Schema({
  en: [PersonalInfoSchema],
  ru: [PersonalInfoSchema],
  ua: [PersonalInfoSchema],
});

export default mongoose.model('PersonalInfo', PersonalInfoWithLocaleSchema);
