import getError from '../utils/getError.js';
import PersonalInfoModel from '../models/PersonalInfo.js';
import UserModel from '../models/User.js';

export const fetch = async (req, res) => {
  try {
    const personalInfoId = req.params.id;
    const personalInfo = await PersonalInfoModel.findById(personalInfoId);

    if (!personalInfo) {
      return getError(res, 404, { message: 'Персональная информация не найденa.' });
    }

    const personalInfoData = personalInfo._doc;

    res.json(personalInfoData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при получении данных', error });
  }
}

export const create = async (req, res) => {
  try {
    const personalInfo = new PersonalInfoModel();

    personalInfo.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalInfo.firstName[req.body.locale] = req.body.firstName;
    personalInfo.lastName[req.body.locale] = req.body.lastName;
    personalInfo.about[req.body.locale] = req.body.about;
    personalInfo.email[req.body.locale] = req.body.email;
    personalInfo.address[req.body.locale] = req.body.address;
    personalInfo.phoneNumber[req.body.locale] = req.body.phoneNumber;
    personalInfo.birthday[req.body.locale] = req.body.birthday;
    personalInfo.linkedIn[req.body.locale] = req.body.linkedIn;
    personalInfo.telegram[req.body.locale] = req.body.telegram;
    personalInfo.portfolio[req.body.locale] = req.body.portfolio;
    personalInfo.set('userUrl', req.body.userUrl);
    personalInfo.set('userId', req.body.userId);

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
    getError(res, 500, { message: 'Ошибка при создании данных', error });
  }
}

export const update = async (req, res) => {
  try {
    const personalInfoId = req.params.id;
    const personalInfo = await PersonalInfoModel.findById(personalInfoId);

    if (!personalInfo) {
      return getError(res, 404, { message: 'Персональная информация не найденa.' });
    }

    personalInfo.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalInfo.firstName[req.body.locale] = req.body.firstName;
    personalInfo.lastName[req.body.locale] = req.body.lastName;
    personalInfo.about[req.body.locale] = req.body.about;
    personalInfo.email[req.body.locale] = req.body.email;
    personalInfo.address[req.body.locale] = req.body.address;
    personalInfo.phoneNumber[req.body.locale] = req.body.phoneNumber;
    personalInfo.birthday[req.body.locale] = req.body.birthday;
    personalInfo.linkedIn[req.body.locale] = req.body.linkedIn;
    personalInfo.telegram[req.body.locale] = req.body.telegram;
    personalInfo.portfolio[req.body.locale] = req.body.portfolio;
    personalInfo.set('userUrl', req.body.userUrl);
    personalInfo.set('userId', req.body.userId);

    const personalInfoData = await personalInfo.save();

    res.json(personalInfoData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при обнавлении данных', error });
  }
}
