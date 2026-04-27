import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalHobbiesSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  hobbies: localesSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('PersonalHobbies', PersonalHobbiesSchema);
