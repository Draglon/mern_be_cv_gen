import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalToolsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  tools: localesSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalTools', PersonalToolsSchema);
