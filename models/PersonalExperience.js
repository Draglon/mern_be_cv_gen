import mongoose from "mongoose";

import { localesStringSchema, localesNumberSchema } from "../utils/schemas/locales.js";

const PersonalExperiencesSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema,
  lastPlacesOfWorks: localesNumberSchema,
  experience: localesStringSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('PersonalExperience', PersonalExperiencesSchema);
