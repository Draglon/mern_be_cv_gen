import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalLanguagesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  languages: localesSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalLanguages', PersonalLanguagesSchema);
