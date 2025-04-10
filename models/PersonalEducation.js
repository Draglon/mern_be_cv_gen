import mongoose from "mongoose";
// import mongooseIntl from 'mongoose-intl';

const PersonalEducationsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  education: { type: String, intl: true, default: "" },
},
{
  timestamps: true,
});

// PersonalEducationsSchema.plugin(mongooseIntl, { languages: ['en', 'ru', 'ua'] });

export default mongoose.model('PersonalEducation', PersonalEducationsSchema);
