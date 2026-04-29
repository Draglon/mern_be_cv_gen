import mongoose from "mongoose";

export const localesStringSchema = new mongoose.Schema(
  {
    en: { type: String, default: "", trim: true },
    ua: { type: String, default: "", trim: true },
    ru: { type: String, default: "", trim: true },
  },
  { _id: false }
);

export const localesNumberSchema = new mongoose.Schema(
  {
    en: { type: Number, default: 0 },
    ua: { type: Number, default: 0 },
    ru: { type: Number, default: 0 },
  },
  { _id: false }
);