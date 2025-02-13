import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalCourseSchema = new mongoose.Schema({
  name: { type: String, intl: true },
  description: { type: String, intl: true },
  startDate: { type: String, intl: true },
  endDate: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalCourseSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

const PersonalCoursesSchema = new mongoose.Schema({
  courses: [PersonalCourseSchema],
},
{
  timestamps: true,
});


export default mongoose.model('PersonalCourses', PersonalCoursesSchema);
