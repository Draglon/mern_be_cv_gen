import mongoose from "mongoose";

export const userIdSchema = ({
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
});
