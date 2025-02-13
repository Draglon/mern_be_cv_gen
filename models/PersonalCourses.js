import mongoose from "mongoose";

const PersonalCourseSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: String,
  endDate: String,
},
{
  timestamps: true,
});

const PersonalCoursesSchema = new mongoose.Schema({
  courses: [PersonalCourseSchema],
},
{
  timestamps: true,
});

const PersonalCoursesWithLocaleSchema = new mongoose.Schema({
  en: [PersonalCoursesSchema],
  ru: [PersonalCoursesSchema],
  ua: [PersonalCoursesSchema],
});

export default mongoose.model('PersonalCourses', PersonalCoursesWithLocaleSchema);
