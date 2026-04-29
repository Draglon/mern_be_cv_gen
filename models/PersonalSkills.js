import mongoose from "mongoose";

import { localesStringSchema } from "../utils/schemas/locales.js";

const PersonalSkillsSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema,
  skills: localesStringSchema,
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
