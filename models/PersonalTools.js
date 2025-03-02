import mongoose from "mongoose";
import mongooseIntl from 'mongoose-intl';

const PersonalToolsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  tools: { type: String, intl: true, default: "" },
},
{
  timestamps: true,
});

PersonalToolsSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalTools', PersonalToolsSchema);
