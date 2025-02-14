import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalSkillsSchema = new mongoose.Schema({
  skills: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalSkillsSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalSkills', PersonalSkillsSchema);
