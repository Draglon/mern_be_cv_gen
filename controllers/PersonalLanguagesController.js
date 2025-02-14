import PersonalLanguagesModel from '../models/PersonalLanguages.js'

export const fetch = async (req, res) => {
      const personalLanguagesId = req.params.id;

  try {
    const personalLanguages = await PersonalLanguagesModel.findById(personalLanguagesId)

    if (!personalLanguages) {
      return res.status(404).json({
        message: 'Персональные языки не найдены',
      })
    }

    const personalLanguagesData = personalLanguages._doc;

    res.json({ ...personalLanguagesData })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const create = async (req, res) => {
  try {
    const personalLanguages = new PersonalLanguagesModel();

    personalLanguages.setLanguage(req.body.locale);
    personalLanguages.set('languages', JSON.stringify(req.body.languages));

    const personalLanguagesData = await personalLanguages.save();

    res.json(personalLanguagesData);
 } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию о знании иностранных языков'
    })
  }
}

export const update = async (req, res) => {
  try {
    const personalLanguagesId = req.params.id;
    const personalLanguages = await PersonalLanguagesModel.findById(personalLanguagesId);

    personalLanguages.setLanguage(req.body.locale);
    personalLanguages.set('languages', JSON.stringify(req.body.languages));

    const personalLanguagesData = await personalLanguages.save();

    res.json(personalLanguagesData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить языки'
    })
  }
}
