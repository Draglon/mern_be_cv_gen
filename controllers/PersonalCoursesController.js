import PersonalCoursesModel from '../models/PersonalCourses.js'

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
  const lang = req.params.lang;

  try {
    const doc = new PersonalCoursesModel({
      [lang]: {
        courses: req.body.courses
      }
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию о курсах.'
    })
  }
}

export const update = async (req, res) => {
  try {
    const lang = req.params.lang;
    const personalCoursesId = req.params.id;

    await PersonalCoursesModel.updateOne({
      _id: personalCoursesId,
    }, {
      [lang]: {
        courses: req.body.courses
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию о курсах.'
    })
  }
}
