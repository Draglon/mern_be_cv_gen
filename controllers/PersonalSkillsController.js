import getError from '../utils/getError.js';
import PersonalSkillsModel from '../models/PersonalSkills.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  const personalSkillsId = req.params.id;

  try {
    const personalSkills = await PersonalSkillsModel.findById(personalSkillsId)

    if (!personalSkills) {
      return getError(res, 404, { message: 'Персональные навыки не найдены.' });
    }

    const personalSkillsData = personalSkills._doc;

    res.json({ ...personalSkillsData })
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при получении данных', error });
  }
}

export const create = async (req, res) => {
  try {
    const personalSkills = new PersonalSkillsModel();

    personalSkills.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalSkills.skills[req.body.locale] = JSON.stringify(req.body.skills);
    personalSkills.set('userId', req.body.userId);

    const personalSkillsData = await personalSkills.save();

    await UserModel.updateOne({
      _id: req.body.userId,
    }, {
      $set: {
        personalSkillsId: personalSkillsData._id,
      }
    });

    res.json(personalSkillsData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при создании данных', error });
  }
}

export const update = async (req, res) => {
  try {
    const personalSkillsId = req.params.id;
    const personalSkills = await PersonalSkillsModel.findById(personalSkillsId);

    if (!personalSkills) {
      return getError(res, 404, { message: 'Персональные навыки не найдены.' });
    }

    personalSkills.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalSkills.skills[req.body.locale] = JSON.stringify(req.body.skills);
    personalSkills.set('userId', req.body.userId);

    const personalSkillsData = await personalSkills.save();

    res.json(personalSkillsData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при обнавлении данных', error });
  }
}
