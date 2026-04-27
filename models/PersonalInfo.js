import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalInfoSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  userUrl: {
    type: String,
    default: "",
  },
  firstName: localesSchema,
  lastName: localesSchema,
  aboutMe: localesSchema,
  email: localesSchema,
  address: localesSchema,
  phoneNumber: localesSchema,
  birthday: localesSchema,
  linkedIn: localesSchema,
  telegram: localesSchema,
  portfolio: localesSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{
  timestamps: true,
});

export default mongoose.model('PersonalInfo', PersonalInfoSchema);
