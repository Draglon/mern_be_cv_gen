import mongoose from "mongoose";

const PersonalEducationSchema = new mongoose.Schema({
  institute: String,
  degree: String,
  specialization: String,
  startDate: String,
  endDate: String,
},
{
  timestamps: true,
});

const PersonalEducationsSchema = new mongoose.Schema({
  education: [PersonalEducationSchema],
},
{
  timestamps: true,
});

const PersonalEducationWithLocaleSchema = new mongoose.Schema({
  en: [PersonalEducationsSchema],
  ru: [PersonalEducationsSchema],
  ua: [PersonalEducationsSchema],
});

export default mongoose.model('PersonalEducation', PersonalEducationWithLocaleSchema);
