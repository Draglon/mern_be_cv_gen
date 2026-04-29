import mongoose from "mongoose";

import { localesStringSchema } from "../utils/schemas/locales.js";

const PersonalCoursesSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema,
  courses: localesStringSchema,
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
