import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalLanguagesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  languages: { type: String, intl: true, default: "" },
},
{
  timestamps: true,
});

PersonalLanguagesSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalLanguages', PersonalLanguagesSchema);
