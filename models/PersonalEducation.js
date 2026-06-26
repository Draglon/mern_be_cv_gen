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
      trim: true,
    },
    faculty: {
      type: String,
      trim: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (this.isCurrent) return true;
          return value && (!this.startDate || value >= this.startDate);
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
