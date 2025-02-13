import PersonalHobbiesModel from '../models/PersonalHobbies.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
      const personalHobbiesId = req.params.id;

  try {
    const personalHobbies = await PersonalHobbiesModel.findById(personalHobbiesId)

    if (!personalHobbies) {
      return res.status(404).json({
        message: 'Персональная информация по интересам не найденa',
      })
    }

    const personalHobbiesData = personalHobbies._doc;

    res.json({ ...personalHobbiesData })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const create = async (req, res) => {
  const lang = req.params.lang;
  const userId = req.params.user_id;

  try {
    const doc = new PersonalHobbiesModel({
      [lang]: {
        hobbies: req.body.hobbies,
      }
    });

    const personalHobbiesData = await doc.save();

    await UserModel.updateOne({
      _id: userId,
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
    const lang = req.params.lang;
    const personalHobbiesId = req.params.id;

    await PersonalHobbiesModel.updateOne({
      _id: personalHobbiesId,
    }, {
      [lang]: {
        hobbies: req.body.hobbies,
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить интересы'
    })
  }
}
