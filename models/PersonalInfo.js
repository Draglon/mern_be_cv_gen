import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalInfoSchema = new mongoose.Schema({
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
    required: true,
  },
  email: {
    type: String,
    intl: true,
    required: true,
  },
  address: {
    type: String,
    intl: true,
  },
  phoneNumber: {
    type: String,
    intl: true,
  },
  birthday: {
    type: String,
    intl: true,
  },
  skype: {
    type: String,
    intl: true,
  },
  linkedIn: {
    type: String,
    intl: true,
  },
  userUrl: {
    type: String,
    intl: true,
  },
},
{
  timestamps: true,
});

PersonalInfoSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalInfo', PersonalInfoSchema);
