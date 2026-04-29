import mongoose from "mongoose";

import { localesStringSchema } from "../utils/schemas/locales.js";

const hobbySchema = new mongoose.Schema(
  {
    hobby: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
  },
  { _id: false}
);

const PersonalHobbiesSchema = new mongoose.Schema(
  {
    sectionTitle: localesStringSchema,
    hobbies: {
      en: { type: [hobbySchema], default: [] },
      ua: { type: [hobbySchema], default: [] },
      ru: { type: [hobbySchema], default: [] },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('PersonalHobbies', PersonalHobbiesSchema);
