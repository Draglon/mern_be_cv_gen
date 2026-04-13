import getError from '../utils/getError.js';
import PersonalEducationModel from '../models/PersonalEducation.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  const personalEducationId = req.params.id;

  try {
    const personalEducation = await PersonalEducationModel.findById(personalEducationId);

    if (!personalEducation) {
      return getError(res, 404, { message: 'Персональное обучение не найдено.' });
    }

    const personalEducationData = personalEducation._doc;

    res.json({ ...personalEducationData });
  } catch (error) {
    console.log(error);
    getError(res, 500,  { message: 'Ошибка при получении данных', error });
  }
}

export const create = async (req, res) => {
  try {
    const personalEducation = new PersonalEducationModel();

    personalEducation.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalEducation.education[req.body.locale] = JSON.stringify(req.body.education);
    personalEducation.set('userId', req.body.userId);

    const personalEducationData = await personalEducation.save();

    await UserModel.updateOne({
      _id: req.body.userId,
    }, {
      $set: {
        personalEducationId: personalEducationData._id,
      }
    });

    res.json(personalEducationData);
  } catch (error) {
    console.log(error);
    getError(res, 500,  { message: 'Ошибка при создании данных', error });
  }
}

export const update = async (req, res) => {
  try {
    const personalEducationId = req.params.id;
    const personalEducation = await PersonalEducationModel.findById(personalEducationId);

    if (!personalEducation) {
      return getError(res, 404, 'Персональное обучение не найдено.');
    }

    personalEducation.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalEducation.education[req.body.locale] = JSON.stringify(req.body.education);
    personalEducation.set('userId', req.body.userId);

    const personalEducationData = await personalEducation.save();

    res.json(personalEducationData);
  } catch (error) {
    console.log(error);
    getError(res, 500,  { message: 'Ошибка при обнавлении данных', error });
  }
}
