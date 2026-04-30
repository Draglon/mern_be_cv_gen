import mongoose from "mongoose";

import { localesStringSchema, localesArraySchema } from "../utils/schemas/locales.js";
import { userIdSchema } from "../utils/schemas/user.js";

const educationSchema = new mongoose.Schema(
  {
    institute: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    faculty: {
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

const PersonalEducationsSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema(),
  education: localesArraySchema(educationSchema),
  userId: userIdSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalEducation', PersonalEducationsSchema);
