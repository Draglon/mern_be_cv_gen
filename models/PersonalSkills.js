import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalSkillsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  skills: localesSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalSkills', PersonalSkillsSchema);
