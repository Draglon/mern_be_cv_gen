import PersonalCoursesModel from '../models/PersonalCourses.js'
import UserModel from '../models/User.js'

export const fetch = async (req, res) => {
  const personalCoursesId = req.params.id;

  try {
    const personalCourses = await PersonalCoursesModel.findById(personalCoursesId)

    if (!personalCourses) {
      return res.status(404).json({
        message: 'Персональные курсы не найдены.',
      })
    }

    const personalCoursesData = personalCourses._doc;

    res.json({ ...personalCoursesData })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const create = async (req, res) => {
  try {
    const personalCourses = new PersonalCoursesModel();

    personalCourses.setLanguage(req.body.locale);
    personalCourses.set('courses', JSON.stringify(req.body.courses));
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

    res.status(500).json({
      message: 'Не удалось создать персональную информацию о курсах.'
    })
  }
}

export const update = async (req, res) => {
  try {
    const personalCoursesId = req.params.id;
    const personalCourses = await PersonalCoursesModel.findById(personalCoursesId);

    personalCourses.setLanguage(req.body.locale);
    personalCourses.set('courses', JSON.stringify(req.body.courses));

    const personalCoursesData = await personalCourses.save();

    res.json(personalCoursesData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию о курсах.'
    })
  }
}
