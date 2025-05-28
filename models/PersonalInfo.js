import mongoose from "mongoose";

import localesSchema from "../lib/constants/locales.js";

const PersonalInfoSchema = new mongoose.Schema({
  sectionTitle: localesSchema,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  userUrl: {
    type: String,
    default: "",
  },
  firstName: localesSchema,
  lastName: localesSchema,
  about: localesSchema,
  email: localesSchema,
  address: localesSchema,
  phoneNumber: localesSchema,
  birthday: localesSchema,
  linkedIn: localesSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalInfo', PersonalInfoSchema);
