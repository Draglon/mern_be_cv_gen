import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalLanguagesSchema = new mongoose.Schema({
  languages: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalLanguagesSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export const PersonalLanguagesModel = mongoose.model('PersonalLanguages', PersonalLanguagesSchema);
