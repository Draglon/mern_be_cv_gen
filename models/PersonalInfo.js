import mongoose from "mongoose";

import { localesStringSchema } from "../utils/schemas/locales.js";
import { userIdSchema } from "../utils/schemas/user.js";

const PersonalInfoSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema(),
  firstName: localesStringSchema(),
  lastName: localesStringSchema(),
  aboutMe: localesStringSchema(),
  email: localesStringSchema(),
  address: localesStringSchema(),
  phoneNumber: localesStringSchema(),
  birthday: localesStringSchema(),
  telegram:  localesStringSchema(),
  linkedIn:  localesStringSchema(),
  portfolio: localesStringSchema(),
  userUrl: localesStringSchema(),
  userId: userIdSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalInfo', PersonalInfoSchema);
