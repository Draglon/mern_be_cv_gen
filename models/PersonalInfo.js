import mongoose from "mongoose";

import { localesStringSchema } from "../utils/schemas/locales.js";

const PersonalInfoSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema,
  firstName: localesStringSchema,
  lastName: localesStringSchema,
  aboutMe: localesStringSchema,
  email: localesStringSchema,
  address: localesStringSchema,
  phoneNumber: localesStringSchema,
  birthday: localesStringSchema,
  telegram:  localesStringSchema,
  linkedIn:  localesStringSchema,
  portfolio: localesStringSchema,
  userUrl: localesStringSchema,
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
