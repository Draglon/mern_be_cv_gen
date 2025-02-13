import PersonalInfoModel from '../models/PersonalInfo.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
      const personalInfoId = req.params.id;

  try {
    const personalInfo = await PersonalInfoModel.findById(personalInfoId)

    if (!personalInfo) {
      return res.status(404).json({
        message: 'Персональная информация не найденa',
      })
    }

    const personalInfoData = personalInfo._doc;

    res.json({ ...personalInfoData })
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
    const doc = new PersonalInfoModel({
      [lang]: {
        userUrl: req.body.userUrl,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        about: req.body.about,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        skype: req.body.skype,
        linkedIn: req.body.linkedIn,
      }
    });

    const personalInfoData = await doc.save();

    await UserModel.updateOne({
      _id: userId,
    }, {
      $set: {
        personalInfoId: personalInfoData._id,
      }
    });

    res.json(personalInfoData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию'
    })
  }
}

export const update = async (req, res) => {
  try {
    const lang = req.params.lang;
    const personalInfoId = req.params.id;

    await PersonalInfoModel.updateOne({
      _id: personalInfoId,
    }, {
      [lang]: {
        userUrl: req.body.userUrl,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        about: req.body.about,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        skype: req.body.skype,
        linkedIn: req.body.linkedIn,
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить'
    })
  }
}
