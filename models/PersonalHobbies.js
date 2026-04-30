import mongoose from "mongoose";

import { localesStringSchema, localesArraySchema } from "../utils/schemas/locales.js";
import { userIdSchema } from "../utils/schemas/user.js";

const hobbySchema = new mongoose.Schema(
  {
    hobby: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
  },
  { _id: false}
);

const PersonalHobbiesSchema = new mongoose.Schema(
  {
    sectionTitle: localesStringSchema(),
    hobbies: localesArraySchema(hobbySchema),
    userId: userIdSchema,
  },
  { timestamps: true }
);

export default mongoose.model('PersonalHobbies', PersonalHobbiesSchema);
