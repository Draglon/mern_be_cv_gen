import getError from '../utils/getError.js';
import PersonalExperienceModel from '../models/PersonalExperience.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  const personalExperienceId = req.params.id;

  try {
    const personalExperience = await PersonalExperienceModel.findById(personalExperienceId)

    if (!personalExperience) {
      return getError(res, 404, { message: 'Персональный опыт работы не найден.' });
    }

    const personalExperienceData = personalExperience._doc;

    res.json({ ...personalExperienceData })
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при получении данных', error });
  }
}

export const create = async (req, res) => {
  try {
    const personalExperience = new PersonalExperienceModel();

    personalExperience.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalExperience.lastPlacesOfWorks = req.body.lastPlacesOfWorks;
    personalExperience.experience[req.body.locale] = JSON.stringify(req.body.experience);
    personalExperience.set('userId', req.body.userId);

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
    getError(res, 500, { message: 'Ошибка при создании данных', error });
  }
}

export const update = async (req, res) => {
  try {
    const personalExperienceId = req.params.id;
    const personalExperience = await PersonalExperienceModel.findById(personalExperienceId);

    if (!personalExperience) {
      return getError(res, 404, { message: 'Персональный опыт работы не найден.' });
    }

    personalExperience.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalExperience.lastPlacesOfWorks = req.body.lastPlacesOfWorks;
    personalExperience.experience[req.body.locale] = JSON.stringify(req.body.experience);
    personalExperience.set('userId', req.body.userId);

    const personalExperienceData = await personalExperience.save();

    res.json(personalExperienceData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при обнавлении данных', error });
  }
}
