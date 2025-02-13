import mongoose from "mongoose";

const PersonalSkillSchema = new mongoose.Schema({
  name: String,
  level: Number,
  visible: Boolean,
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

const PersonalSkillsWithLocaleSchema = new mongoose.Schema({
  en: [PersonalSkillsSchema],
  ru: [PersonalSkillsSchema],
  ua: [PersonalSkillsSchema],
});

export default mongoose.model('PersonalSkills', PersonalSkillsWithLocaleSchema);
