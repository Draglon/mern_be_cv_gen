import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalCoursesSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  courses: localesSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalCourses', PersonalCoursesSchema);
