import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalCoursesSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  courses: localesSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('PersonalCourses', PersonalCoursesSchema);
