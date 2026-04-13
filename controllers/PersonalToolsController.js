import getError from '../utils/getError.js';
import PersonalToolsModel from '../models/PersonalTools.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  const personalToolsId = req.params.id;

  try {
    const personalTools = await PersonalToolsModel.findById(personalToolsId)

    if (!personalTools) {
      return getError(res, 404, { message: 'Персональные инструменты не найдены.' });
    }

    const personalToolsData = personalTools._doc;

    res.json({ ...personalToolsData })
  } catch (error) {
    console.log(error)
    getError(res, 500, { message: 'Ошибка при получении данных', error });
  }
}

export const create = async (req, res) => {
  try {
    const personalTools = new PersonalToolsModel();

    personalTools.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalTools.tools[req.body.locale] = JSON.stringify(req.body.tools);
    personalTools.set('userId', req.body.userId);

    const personalToolsData = await personalTools.save();

    await UserModel.updateOne({
      _id: req.body.userId,
    }, {
      $set: {
        personalToolsId: personalToolsData._id,
      }
    });

    res.json(personalToolsData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при создании данных', error });
  }
}

export const update = async (req, res) => {
  try {
    const personalToolsId = req.params.id;
    const personalTools = await PersonalToolsModel.findById(personalToolsId);

    if (!personalTools) {
      return getError(res, 404, { message: 'Персональные инструменты не найдены.' });
    }

    personalTools.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalTools.tools[req.body.locale] = JSON.stringify(req.body.tools);
    personalTools.set('userId', req.body.userId);

    const personalToolsData = await personalTools.save();

    res.json(personalToolsData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при обнавлении данных', error });
  }
}
