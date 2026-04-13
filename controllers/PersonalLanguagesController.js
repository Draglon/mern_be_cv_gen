import getError from '../utils/getError.js';
import PersonalLanguagesModel from '../models/PersonalLanguages.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
      const personalLanguagesId = req.params.id;

  try {
    const personalLanguages = await PersonalLanguagesModel.findById(personalLanguagesId)

    if (!personalLanguages) {
      return getError(res, 404, { message: 'Персональные языки не найдены.' });
    }

    const personalLanguagesData = personalLanguages._doc;

    res.json({ ...personalLanguagesData })
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при получении данных', error });
  }
}

export const create = async (req, res) => {
  try {
    const personalLanguages = new PersonalLanguagesModel();

    personalLanguages.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalLanguages.languages[req.body.locale] = JSON.stringify(req.body.languages);
    personalLanguages.set('userId', req.body.userId);

    const personalLanguagesData = await personalLanguages.save();

    await UserModel.updateOne({
      _id: req.body.userId,
    }, {
      $set: {
        personalLanguagesId: personalLanguagesData._id,
      }
    });

    res.json(personalLanguagesData);
 } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при создании данных', error });
  }
}

export const update = async (req, res) => {
  try {
    const personalLanguagesId = req.params.id;
    const personalLanguages = await PersonalLanguagesModel.findById(personalLanguagesId);

    if (!personalLanguages) {
      return getError(res, 404, { message: 'Персональные языки не найдены.' });
    }

    personalLanguages.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalLanguages.languages[req.body.locale] = JSON.stringify(req.body.languages);
    personalLanguages.set('userId', req.body.userId);

    const personalLanguagesData = await personalLanguages.save();

    res.json(personalLanguagesData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при обнавлении данных', error });
  }
}
