import PersonalInfoModel from '../models/PersonalInfo.js';
import UserModel from '../models/User.js';

export const fetch = async (req, res) => {
  try {
    const personalInfoId = req.params.id;
    const personalInfo = await PersonalInfoModel.findById(personalInfoId);

    if (!personalInfo) {
      return res.status(404).json({
        message: 'Персональная информация не найденa',
      })
    }

    const personalInfoData = personalInfo._doc;

    res.json(personalInfoData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const create = async (req, res) => {
  try {
    const personalInfo = new PersonalInfoModel();

    personalInfo.setLanguage(req.body.locale);
    personalInfo.set('firstName', req.body.firstName);
    personalInfo.set('lastName', req.body.lastName);
    personalInfo.set('about', req.body.about);
    personalInfo.set('email', req.body.email);
    personalInfo.set('address', req.body.address);
    personalInfo.set('phoneNumber', req.body.phoneNumber);
    personalInfo.set('birthday', req.body.birthday);
    personalInfo.set('skype', req.body.skype);
    personalInfo.set('linkedIn', req.body.linkedIn);
    personalInfo.set('userUrl', req.body.userUrl);

    const personalInfoData = await personalInfo.save();

    await UserModel.updateOne({
      _id: req.body.userId,
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
    const personalInfoId = req.params.id;
    const personalInfo = await PersonalInfoModel.findById(personalInfoId);

    personalInfo.setLanguage(req.body.locale);
    personalInfo.set('userUrl', req.body.userUrl);
    personalInfo.set('firstName', req.body.firstName);
    personalInfo.set('lastName', req.body.lastName);
    personalInfo.set('about', req.body.about);
    personalInfo.set('email', req.body.email);
    personalInfo.set('address', req.body.address);
    personalInfo.set('phoneNumber', req.body.phoneNumber);
    personalInfo.set('birthday', req.body.birthday);
    personalInfo.set('skype', req.body.skype);
    personalInfo.set('linkedIn', req.body.linkedIn);

    const personalInfoData = await personalInfo.save();

    res.json(personalInfoData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить'
    })
  }
}
