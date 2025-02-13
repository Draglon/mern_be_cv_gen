import mongoose from "mongoose";

const PersonalLanguageSchema = new mongoose.Schema({
  language: String,
  level: String,
},
{
  timestamps: true,
});

const PersonalLanguagesSchema = new mongoose.Schema({
  languages: [PersonalLanguageSchema],
},
{
  timestamps: true,
});

const PersonalLanguagesWithLocaleSchema = new mongoose.Schema({
  en: [PersonalLanguagesSchema],
  ru: [PersonalLanguagesSchema],
  ua: [PersonalLanguagesSchema],
});

export default mongoose.model('PersonalLanguages', PersonalLanguagesWithLocaleSchema);
