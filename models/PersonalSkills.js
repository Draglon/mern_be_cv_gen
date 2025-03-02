import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalSkillsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  skills: { type: String, intl: true, default: "" },
},
{
  timestamps: true,
});

PersonalSkillsSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalSkills', PersonalSkillsSchema);
