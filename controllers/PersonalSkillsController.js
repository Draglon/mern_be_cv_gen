import PersonalSkillsModel from '../models/PersonalSkills.js'

export const fetch = async (req, res) => {
      const personalSkillsId = req.params.id;

  try {
    const personalSkills = await PersonalSkillsModel.findById(personalSkillsId)

    if (!personalSkills) {
      return res.status(404).json({
        message: 'Персональные навыки не найдены.',
      })
    }

    const personalSkillsData = personalSkills._doc;

    res.json({ ...personalSkillsData })
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
    const doc = new PersonalSkillsModel({
      [lang]: {
        skills: req.body.skills
      }
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию о навыках.'
    })
  }
}

export const update = async (req, res) => {
  try {
    const lang = req.params.lang;
    const personalSkillsId = req.params.id;

    await PersonalSkillsModel.updateOne({
      _id: personalSkillsId,
    }, {
      [lang]: {
        skills: req.body.skills
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию о навыках.'
    })
  }
}
