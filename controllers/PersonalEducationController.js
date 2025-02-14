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
  try {
    const personalEducation = new PersonalEducationModel();

    personalEducation.setLanguage(req.body.locale);
    personalEducation.set('education', JSON.stringify(req.body.education));

    const personalEducationData = await personalEducation.save();

    res.json(personalEducationData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию обучения.'
    })
  }
}

export const update = async (req, res) => {
  try {
    const personalEducationId = req.params.id;
    const personalEducation = await PersonalEducationModel.findById(personalEducationId);

    personalEducation.setLanguage(req.body.locale);
    personalEducation.set('education', JSON.stringify(req.body.education));

    const personalEducationData = await personalEducation.save();

    res.json(personalEducationData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию обучения.'
    })
  }
}
