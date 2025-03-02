import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalCoursesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  courses: { type: String, intl: true, default: "" },
},
{
  timestamps: true,
});

PersonalCoursesSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalCourses', PersonalCoursesSchema);
