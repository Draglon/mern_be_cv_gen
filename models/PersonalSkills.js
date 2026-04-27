import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalSkillsSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  skills: localesSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('PersonalSkills', PersonalSkillsSchema);
