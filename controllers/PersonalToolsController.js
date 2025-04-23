import PersonalToolsModel from '../models/PersonalTools.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  const personalToolsId = req.params.id;

  try {
    const personalTools = await PersonalToolsModel.findById(personalToolsId)

    if (!personalTools) {
      return res.status(404).json({
        message: 'Персональные инструменты не найдены.',
      })
    }

    const personalToolsData = personalTools._doc;

    res.json({ ...personalToolsData })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const create = async (req, res) => {
  try {
    const personalTools = new PersonalToolsModel();

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

    res.status(500).json({
      message: 'Не удалось создать персональную информацию о инструментах.'
    })
  }
}

export const update = async (req, res) => {
  try {
    const personalToolsId = req.params.id;
    const personalTools = await PersonalToolsModel.findById(personalToolsId);

    personalTools.tools[req.body.locale] = JSON.stringify(req.body.tools);
    personalTools.set('userId', req.body.userId);

    const personalToolsData = await personalTools.save();

    res.json(personalToolsData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию о инструментах.'
    })
  }
}
