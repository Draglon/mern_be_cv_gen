import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalEducationsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  education: localesSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalEducation', PersonalEducationsSchema);
