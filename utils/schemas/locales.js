import mongoose from "mongoose";

export const localesStringSchema = (options = {}) => new mongoose.Schema(
  {
    en: { type: String, default: "", trim: true, ...options },
    ua: { type: String, default: "", trim: true, ...options },
    ru: { type: String, default: "", trim: true, ...options },
  },
  { _id: false }
);

export const localesNumberSchema = (options = {}) => new mongoose.Schema(
  {
    en: { type: Number, default: 0, ...options },
    ua: { type: Number, default: 0, ...options },
    ru: { type: Number, default: 0, ...options },
  },
  { _id: false }
);

export const localesArraySchema = (schema, options = {}) => new mongoose.Schema(
  {
    en: { type: [schema], default: [], ...options },
    ua: { type: [schema], default: [], ...options },
    ru: { type: [schema], default: [], ...options },
  },
  { _id: false }
);
