import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalExperiencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  experience: { type: String, intl: true, default: "" },
},
{
  timestamps: true,
});

PersonalExperiencesSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalExperience', PersonalExperiencesSchema);
