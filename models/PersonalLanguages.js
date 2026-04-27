import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalLanguagesSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  languages: localesSchema,
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
