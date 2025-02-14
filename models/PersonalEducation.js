import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalEducationsSchema = new mongoose.Schema({
  education: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalEducationsSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalEducation', PersonalEducationsSchema);
