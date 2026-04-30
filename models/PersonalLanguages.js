import mongoose from "mongoose";

import { LANGUAGE_LEVEL } from "../lib/constants/languages.js";
import { localesStringSchema, localesArraySchema } from "../utils/schemas/locales.js";
import { userIdSchema } from "../utils/schemas/user.js";

const languageSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    level: {
      type: String,
      enum: LANGUAGE_LEVEL,
      required: true,
    },
  },
  { _id: false}
);

const PersonalLanguagesSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema(),
  languages: localesArraySchema(languageSchema),
  userId: userIdSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalLanguages', PersonalLanguagesSchema);
