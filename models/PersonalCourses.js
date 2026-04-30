import mongoose from "mongoose";

import { localesStringSchema, localesArraySchema } from "../utils/schemas/locales.js";
import { userIdSchema } from "../utils/schemas/user.js";

const courseSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return !this.startDate || value >= this.startDate;
        },
        message: "End date must be greater than start date",
      },
    },
  },
  { _id: false}
);

const PersonalCoursesSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema(),
  courses: localesArraySchema(courseSchema),
  userId: userIdSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalCourses', PersonalCoursesSchema);
