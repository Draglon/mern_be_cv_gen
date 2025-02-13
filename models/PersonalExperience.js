import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalExperienceSchema = new mongoose.Schema({
  position: { type: String, intl: true },
  companyName: { type: String, intl: true },
  location: { type: String, intl: true },
  place: { type: String, intl: true },
  time: { type: String, intl: true },
  startDate: { type: String, intl: true },
  endDate: { type: String, intl: true },
  description: { type: String, intl: true },
  skills: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalExperienceSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

const PersonalExperiencesSchema = new mongoose.Schema({
  experience: [PersonalExperienceSchema],
},
{
  timestamps: true,
});

export default mongoose.model('PersonalExperience', PersonalExperiencesSchema);
