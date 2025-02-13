import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalHobbiesSchema = new mongoose.Schema({
  hobbies: { type: String, intl: true },
},
{
  timestamps: true,
});

PersonalHobbiesSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalHobbies', PersonalHobbiesSchema);
