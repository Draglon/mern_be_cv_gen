import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalToolsSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  tools: localesSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('PersonalTools', PersonalToolsSchema);
