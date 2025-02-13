import mongoose from "mongoose";

const PersonalHobbiesSchema = new mongoose.Schema({
  hobbies: [String],
},
{
  timestamps: true,
});

const PersonalHobbiesWithLocaleSchema = new mongoose.Schema({
  en: [PersonalHobbiesSchema],
  ru: [PersonalHobbiesSchema],
  ua: [PersonalHobbiesSchema],
});

export default mongoose.model('PersonalHobbies', PersonalHobbiesWithLocaleSchema);
