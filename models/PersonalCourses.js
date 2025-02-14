import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalCoursesSchema = new mongoose.Schema({
  courses: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalCoursesSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalCourses', PersonalCoursesSchema);
