import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  userUrl: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    intl: true,
    required: true,
  },
  lastName: {
    type: String,
    intl: true,
    required: true,
  },
  about: {
    type: String,
    intl: true,
    default: "",
  },
  email: {
    type: String,
    intl: true,
    required: "",
  },
  address: {
    type: String,
    intl: true,
    default: "",
  },
  phoneNumber: {
    type: String,
    intl: true,
    default: "",
  },
  birthday: {
    type: String,
    intl: true,
    default: "",
  },
  skype: {
    type: String,
    intl: true,
    default: "",
  },
  linkedIn: {
    type: String,
    intl: true,
    default: "",
  },
},
{
  timestamps: true,
});

PersonalInfoSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalInfo', PersonalInfoSchema);
