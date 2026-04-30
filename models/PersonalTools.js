import mongoose from "mongoose";

import { localesStringSchema, localesArraySchema } from "../utils/schemas/locales.js";
import { userIdSchema } from "../utils/schemas/user.js";

const toolsSchema = new mongoose.Schema(
  {
    tool: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false}
);

const PersonalToolsSchema = new mongoose.Schema({
  sectionTitle: localesStringSchema(),
  tools: localesArraySchema(toolsSchema),
  userId: userIdSchema,
},
{
  timestamps: true,
});

export default mongoose.model('PersonalTools', PersonalToolsSchema);
