import PersonalEducationModel from '../models/PersonalEducation.js'

export const fetch = async (req, res) => {
      const personalEducationId = req.params.id;

  try {
    const personalEducation = await PersonalEducationModel.findById(personalEducationId)

    if (!personalEducation) {
      return res.status(404).json({
        message: 'Персональное обучение не найдено.',
      })
    }

    const personalEducationData = personalEducation._doc;

    res.json({ ...personalEducationData })
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
    const doc = new PersonalEducationModel({
      [lang]: {
        education: req.body.education
      }
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию обучения.'
    })
  }
}

export const update = async (req, res) => {
  try {
    const lang = req.params.lang;
    const personalEducationId = req.params.id;

    await PersonalEducationModel.updateOne({
      _id: personalEducationId,
    }, {
      [lang]: {
        education: req.body.education
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию обучения.'
    })
  }
}
