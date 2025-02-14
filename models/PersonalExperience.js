import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalExperiencesSchema = new mongoose.Schema({
  experience: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalExperiencesSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalExperience', PersonalExperiencesSchema);
