import mongoose from "mongoose";

const PersonalExperienceSchema = new mongoose.Schema({
  position: String,
  companyName: String,
  location: String,
  place: String,
  time: String,
  startDate: String,
  endDate: String,
  description: String,
  skills: [String],
},
{
  timestamps: true,
});

const PersonalExperiencesSchema = new mongoose.Schema({
  experience: [PersonalExperienceSchema],
},
{
  timestamps: true,
});

const PersonalExperienceWithLocaleSchema = new mongoose.Schema({
  en: [PersonalExperiencesSchema],
  ru: [PersonalExperiencesSchema],
  ua: [PersonalExperiencesSchema],
});

export default mongoose.model('PersonalExperience', PersonalExperienceWithLocaleSchema);
