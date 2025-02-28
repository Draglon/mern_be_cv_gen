import PersonalSkillsModel from '../models/PersonalSkills.js'
import UserModel from '../models/User.js'

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
  try {
    const personalSkills = new PersonalSkillsModel();

    personalSkills.setLanguage(req.body.locale);
    personalSkills.set('skills', JSON.stringify(req.body.skills));

    const personalSkillsData = await personalSkills.save();

    await UserModel.updateOne({
      _id: req.body.userId,
    }, {
      $set: {
        personalSkillsId: personalSkillsData._id,
      }
    });

    res.json(personalSkillsData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию о навыках.'
    })
  }
}

export const update = async (req, res) => {
  try {
    const personalSkillsId = req.params.id;
    const personalSkills = await PersonalSkillsModel.findById(personalSkillsId);

    personalSkills.setLanguage(req.body.locale);
    personalSkills.set('skills', JSON.stringify(req.body.skills));

    const personalSkillsData = await personalSkills.save();

    res.json(personalSkillsData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось обновить информацию о навыках.'
    })
  }
}
