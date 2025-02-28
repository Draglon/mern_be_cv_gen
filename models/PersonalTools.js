import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalToolsSchema = new mongoose.Schema({
  tools: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalToolsSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalTools', PersonalToolsSchema);
