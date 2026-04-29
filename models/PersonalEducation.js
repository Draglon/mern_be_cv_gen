import mongoose from "mongoose";

import { localesStringSchema } from "../utils/schemas/locales.js";

const PersonalEducationsSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema,
  education: localesStringSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('PersonalEducation', PersonalEducationsSchema);
