import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, MAX_EMAIL_LENGTH, MAX_PHONE_NUMBER_LENGTH, MAX_TEXTAREA_CONTENT_NORMAL_LENGTH } from "../lib/constants/index.js";

export const personalInfoValidation = [
  body('sectionTitle', 'Укажите название раздела.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('userUrl', 'Неверная ссылка на фотографию.').optional(),
  body('firstName', 'Имя должно быть минимум 3 символа.').isLength({ min: MIN_INPUT_LENGTH }),
  body('lastName', 'Фамилия должна быть минимум 3 символа.').isLength({ min: MIN_INPUT_LENGTH }),
  body('email', 'Неверный формат почты.').trim().isEmail().isLength({ max: MAX_EMAIL_LENGTH }),
  body('address', 'Укажите адрес.').isLength({ max: MAX_INPUT_LENGTH }),
  body('phoneNumber', 'Укажите номер телефона.').isLength({ max: MAX_PHONE_NUMBER_LENGTH }),
  body('birthday', 'Укажите дату рождения.'),
  body('linkedIn', 'Укажите linkedIn.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('telegram', 'Укажите telegram.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('portfolio', 'Укажите portfolio.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
];

export const personalHobbiesValidation = [
  body('sectionTitle', 'Укажите название раздела.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('hobbies', 'Укажите хобби или интерес.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
];

export const personalLanguagesValidation = [
  body('sectionTitle', 'Укажите название раздела.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('language', 'Укажите язык.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('level', 'Укажите уровень знания языка.'),
];

export const personalExperienceValidation = [
  body('sectionTitle', 'Укажите название раздела.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('lastPlacesOfWorks', 'Укажите число последних мест работ.').optional(),
  body('position', 'Укажите должность.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('companyName', 'Укажите название компании.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('location', 'Укажите место работы.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('placeOfWork', 'Укажите тип работы.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('workingTime', 'Укажите рабочее время.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('startDate', 'Укажите время начала работы.'),
  body('endDate', 'Укажите время окончания работы.'),
  body('description', 'Укажите описание своей работы.').isLength({ max: MAX_TEXTAREA_CONTENT_NORMAL_LENGTH }),
  body('skills', 'Укажите используемые навыки.').optional(),
];

export const personalEducationValidation = [
  body('sectionTitle', 'Укажите название раздела.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('institute', 'Укажите институт.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('degree', 'Укажите степень образования.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('faculty', 'Укажите факультет.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('specialization', 'Укажите специализацию.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('startDate', 'Укажите дату начала обучения.'),
  body('endDate', 'Укажите дату конеца обучения.'),
];

export const personalCoursesValidation = [
  body('sectionTitle', 'Укажите название раздела.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('course', 'Укажите название курса.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('description', 'Укажите описание курса.').isLength({ max: MAX_TEXTAREA_CONTENT_NORMAL_LENGTH }),
  body('startDate', 'Укажите дату начала обучения.'),
  body('endDate', 'Укажите дату конеца обучения.'),
];

export const personalSkillsValidation = [
  body('sectionTitle', 'Укажите название раздела.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('skill', 'Укажите название навыка.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('level', 'Укажите уровень владения навыком.'),
  body('visible'),
];

export const personalToolsValidation = [
  body('sectionTitle', 'Укажите название раздела.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }).optional(),
  body('tool', 'Укажите название инструмента.').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
  body('level', 'Укажите уровень владения инструментом.'),
  body('visible'),
];
