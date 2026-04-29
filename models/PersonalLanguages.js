import mongoose from "mongoose";

import { localesStringSchema } from "../utils/schemas/locales.js";

const PersonalLanguagesSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema,
  languages: localesStringSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('PersonalLanguages', PersonalLanguagesSchema);
