import PersonalHobbiesModel from '../models/PersonalHobbies.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  try {
    const personalHobbiesId = req.params.id;
    const personalHobbies = await PersonalHobbiesModel.findById(personalHobbiesId)

    if (!personalHobbies) {
      return res.status(404).json({
        message: 'Персональная информация по интересам не найденa',
      })
    }

    const personalHobbiesData = personalHobbies._doc;

    res.json(personalHobbiesData)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const create = async (req, res) => {
  try {
    const personalHobbies = new PersonalHobbiesModel();

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

    res.status(500).json({
      message: 'Не удалось создать персональную информацию о интересах и хобби'
    })
  }
}

export const update = async (req, res) => {
  try {
    const personalHobbiesId = req.params.id;
    const personalHobbies = await PersonalHobbiesModel.findById(personalHobbiesId);

    personalHobbies.hobbies[req.body.locale] = JSON.stringify(req.body.hobbies);
    personalHobbies.set('userId', req.body.userId);

    const personalHobbiesData = await personalHobbies.save();

    res.json(personalHobbiesData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить интересы'
    })
  }
}
