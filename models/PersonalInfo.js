import mongoose from "mongoose";
// import mongooseI18nExtra from 'mongoose-i18n-extra';
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
    // i18n: true,
    required: true,
  },
  lastName: {
    type: String,
    intl: true,
    // i18n: true,
    required: true,
  },
  about: {
    type: String,
    intl: true,
    // i18n: true,
    default: "",
  },
  email: {
    type: String,
    intl: true,
    // i18n: true,
    required: "",
  },
  address: {
    type: String,
    intl: true,
    // i18n: true,
    default: "",
  },
  phoneNumber: {
    type: String,
    intl: true,
    // i18n: true,
    default: "",
  },
  birthday: {
    type: String,
    intl: true,
    // i18n: true,
    default: "",
  },
  skype: {
    type: String,
    intl: true,
    // i18n: true,
    default: "",
  },
  linkedIn: {
    type: String,
    intl: true,
    // i18n: true,
    default: "",
  },
},
{
  timestamps: true,
});

// PersonalInfoSchema.plugin(mongooseI18nExtra, { languages: ['en', 'ru', 'ua'] });

PersonalInfoSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalInfo', PersonalInfoSchema);
