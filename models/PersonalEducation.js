import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalEducationSchema = new mongoose.Schema({
  institute: { type: String, intl: true },
  degree: { type: String, intl: true },
  specialization: { type: String, intl: true },
  startDate: { type: String, intl: true },
  endDate: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalEducationSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

const PersonalEducationsSchema = new mongoose.Schema({
  education: [PersonalEducationSchema],
},
{
  timestamps: true,
});

export default mongoose.model('PersonalEducation', PersonalEducationsSchema);
