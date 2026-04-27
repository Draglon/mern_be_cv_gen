import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalEducationsSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  education: localesSchema,
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
