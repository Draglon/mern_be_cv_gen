import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalHobbiesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  hobbies: localesSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalHobbies', PersonalHobbiesSchema);
