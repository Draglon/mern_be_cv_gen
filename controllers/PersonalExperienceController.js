import PersonalExperienceModel from '../models/PersonalExperience.js'

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
  const lang = req.params.lang;

  try {
    const doc = new PersonalExperienceModel({
      [lang]: {
        experience: req.body.experience
      }
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию опыта работы'
    })
  }
}

export const update = async (req, res) => {
  try {
    const lang = req.params.lang;
    const personalExperienceId = req.params.id;

    await PersonalExperienceModel.updateOne({
      _id: personalExperienceId,
    }, {
      [lang]: {
        experience: req.body.experience
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию опыта работы'
    })
  }
}
