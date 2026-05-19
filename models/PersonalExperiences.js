import mongoose from "mongoose";

import { EMPLOYMENT_TYPES, WORK_FORMATS } from "../lib/constants/experiences.js";
import { localesStringSchema, localesNumberSchema, localesArraySchema } from "../utils/schemas/locales.js";
import { userIdSchema } from "../utils/schemas/user.js";

const experienceSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    position: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    location: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: EMPLOYMENT_TYPES,
      required: true,
    },
    workFormat: {
      type: String,
      enum: WORK_FORMATS,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
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
    skills: [
      {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
    ],
  },
  { _id: false}
);

const PersonalExperiencesSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema(),
  recentPositionsCount: localesNumberSchema(),
  experiences: localesArraySchema(experienceSchema),
  userId: userIdSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalExperience', PersonalExperiencesSchema);
