import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalHobbiesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  hobbies: { type: String, intl: true, default: "" },
},
{
  timestamps: true,
});

PersonalHobbiesSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalHobbies', PersonalHobbiesSchema);
