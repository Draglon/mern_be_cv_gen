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
  const lang = req.params.lang;

  try {
    const doc = new PersonalLanguagesModel({
      [lang]: {
        languages: req.body.languages,
      }
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию о знании иностранных языков'
    })
  }
}

export const update = async (req, res) => {
  try {
    const lang = req.params.lang;
    const personalLanguagesId = req.params.id;

    await PersonalLanguagesModel.updateOne({
      _id: personalLanguagesId,
    }, {
      [lang]: {
        languages: req.body.languages,
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить языки'
    })
  }
}
