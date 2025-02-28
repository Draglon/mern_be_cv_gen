import PersonalExperienceModel from '../models/PersonalExperience.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  const personalExperienceId = req.params.id;

  try {
    const personalExperience = await PersonalExperienceModel.findById(personalExperienceId)

    if (!personalExperience) {
      return res.status(404).json({
        message: 'Персональный опыт работы.',
      })
    }

    const personalExperienceData = personalExperience._doc;

    res.json({ ...personalExperienceData })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const create = async (req, res) => {
  try {
    const personalExperience = new PersonalExperienceModel();

    personalExperience.setLanguage(req.body.locale);
    personalExperience.set('experience', JSON.stringify(req.body.experience));

    const personalExperienceData = await personalExperience.save();

    await UserModel.updateOne({
      _id: req.body.userId,
    }, {
      $set: {
        personalExperienceId: personalExperienceData._id,
      }
    });

    res.json(personalExperienceData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию опыта работы'
    })
  }
}

export const update = async (req, res) => {
  try {
    const personalExperienceId = req.params.id;
    const personalExperience = await PersonalExperienceModel.findById(personalExperienceId);

    personalExperience.setLanguage(req.body.locale);
    personalExperience.set('experience', JSON.stringify(req.body.experience));

    const personalExperienceData = await personalExperience.save();

    res.json(personalExperienceData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию опыта работы'
    })
  }
}
