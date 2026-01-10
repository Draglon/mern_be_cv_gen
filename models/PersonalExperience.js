import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalExperiencesSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  lastPlacesOfWorks: {
    type: Number,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  experience: localesSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalExperience', PersonalExperiencesSchema);
