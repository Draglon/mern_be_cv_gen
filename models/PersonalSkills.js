import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalSkillSchema = new mongoose.Schema({
  name: {
    type: String,
    intl: true,
  },
  level: {
    type: Number,
  },
  visible: {
    type: Boolean,
  },
},
{
  timestamps: true,
});

const PersonalSkillsSchema = new mongoose.Schema({
  skills: [PersonalSkillSchema],
},
{
  timestamps: true,
});

PersonalSkillsSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalSkills', PersonalSkillsSchema);
