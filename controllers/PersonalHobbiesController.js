import getError from '../utils/getError.js';
import PersonalHobbiesModel from '../models/PersonalHobbies.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  try {
    const personalHobbiesId = req.params.id;
    const personalHobbies = await PersonalHobbiesModel.findById(personalHobbiesId)

    if (!personalHobbies) {
      return getError(res, 404, { message: 'Персональная информация по интересам не найденa.' });
    }

    const personalHobbiesData = personalHobbies._doc;

    res.json(personalHobbiesData)
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при получении данных', error });
  }
}

export const create = async (req, res) => {
  try {
    const personalHobbies = new PersonalHobbiesModel();

    personalHobbies.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalHobbies.hobbies[req.body.locale] = JSON.stringify(req.body.hobbies);
    personalHobbies.set('userId', req.body.userId);

    const personalHobbiesData = await personalHobbies.save();

    await UserModel.updateOne({
      _id: req.body.userId,
    }, {
      $set: {
        personalHobbiesId: personalHobbiesData._id,
      }
    });

    res.json(personalHobbiesData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при создании данных', error });
  }
}

export const update = async (req, res) => {
  try {
    const personalHobbiesId = req.params.id;
    const personalHobbies = await PersonalHobbiesModel.findById(personalHobbiesId);

    if (!personalHobbies) {
      return getError(res, 404, { message: 'Персональная информация по интересам не найденa.' });
    }

    personalHobbies.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalHobbies.hobbies[req.body.locale] = JSON.stringify(req.body.hobbies);
    personalHobbies.set('userId', req.body.userId);

    const personalHobbiesData = await personalHobbies.save();

    res.json(personalHobbiesData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при обнавлении данных', error });
  }
}
