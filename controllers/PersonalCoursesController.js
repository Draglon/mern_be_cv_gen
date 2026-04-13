import getError from '../utils/getError.js';
import PersonalCoursesModel from '../models/PersonalCourses.js';
import UserModel from '../models/User.js';

export const fetch = async (req, res) => {
  const personalCoursesId = req.params.id;

  try {
    const personalCourses = await PersonalCoursesModel.findById(personalCoursesId);

    if (!personalCourses) {
      return getError(res, 404, { message: 'Персональные курсы не найдены.' });
    }

    const personalCoursesData = personalCourses._doc;

    res.json({ ...personalCoursesData })
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Ошибка при получении данных', error });
  }
}

export const create = async (req, res) => {
  try {
    const personalCourses = new PersonalCoursesModel();

    personalCourses.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalCourses.courses[req.body.locale] = JSON.stringify(req.body.courses);
    personalCourses.set('userId', req.body.userId);

    const personalCoursesData = await personalCourses.save();

    await UserModel.updateOne({
      _id: req.body.userId,
    }, {
      $set: {
        personalCoursesId: personalCoursesData._id,
      }
    });

    res.json(personalCoursesData);
  } catch (error) {
    console.log(error);
    getError(res, 500,  { message: 'Ошибка при создании данных', error });
  }
}

export const update = async (req, res) => {
  try {
    const personalCoursesId = req.params.id;
    const personalCourses = await PersonalCoursesModel.findById(personalCoursesId);

    if (!personalCourses) {
      return getError(res, 404, 'Персональные курсы не найдены.');
    }

    personalCourses.sectionTitle[req.body.locale] = req.body?.sectionTitle;
    personalCourses.courses[req.body.locale] = JSON.stringify(req.body.courses);
    personalCourses.set('userId', req.body.userId);

    const personalCoursesData = await personalCourses.save();

    res.json(personalCoursesData);
  } catch (error) {
    console.log(error);
    getError(res, 500,  { message: 'Ошибка при обнавлении данных', error });
  }
}
