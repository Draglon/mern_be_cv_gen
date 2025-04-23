import { body } from 'express-validator'

export const personalInfoValidation = [
  body('userUrl', 'Неверная ссылка на фотографию').optional(),
  body('firstName', 'Имя должно быть минимум 3 символа').isLength({ min: 3 }),
  body('lastName', 'Фамилия должна быть минимум 3 символа').isLength({ min: 3 }),
  body('email', 'Неверный формат почты.').trim().isEmail(),
  body('address', 'Укажите адрес.').optional(),
  body('phoneNumber', 'Укажите номер телефона.').optional(),
  body('birthday', 'Укажите дату рождения.').optional(),
  body('linkedIn', 'Укажите linkedIn.').optional(),
]

export const personalHobbiesValidation = [
  body('hobbies', 'Укажите хобби или интерес.').optional(),
]

export const personalLanguagesValidation = [
  body('language', 'Укажите язык.').optional(),
  body('level', 'Укажите уровень знания языка.').optional(),
]

export const personalExperienceValidation = [
  body('position', 'Укажите должность.').optional(),
  body('companyName', 'Укажите название компании.').optional(),
  body('location', 'Укажите место работы.').optional(),
  body('placeOfWork', 'Укажите тип работы.').optional(),
  body('workingTime', 'Укажите рабочее время.').optional(),
  body('startDate', 'Укажите время начала работы.').optional(),
  body('endDate', 'Укажите время окончания работы.').optional(),
  body('description', 'Укажите описание своей работы.').optional(),
  body('skills', 'Укажите используемые навыки.').optional(),
]

export const personalEducationValidation = [
  body('institute', 'Укажите институт.').optional(),
  body('degree', 'Укажите степень образования.').optional(),
  body('faculty', 'Укажите факультет.').optional(),
  body('specialization', 'Укажите специализацию.').optional(),
  body('startDate', 'Укажите дату начала обучения.').optional(),
  body('endDate', 'Укажите дату конеца обучения.').optional(),
]

export const personalCoursesValidation = [
  body('course', 'Укажите название курса.').optional(),
  body('description', 'Укажите описание курса.').optional(),
  body('startDate', 'Укажите дату начала обучения.').optional(),
  body('endDate', 'Укажите дату конеца обучения.').optional(),
]

export const personalSkillsValidation = [
  body('skill', 'Укажите название навыка.').optional(),
  body('level', 'Укажите уровень владения навыком.').optional(),
  body('visible').optional(),
]

export const personalToolsValidation = [
  body('tool', 'Укажите название инструмента.').optional(),
  body('level', 'Укажите уровень владения инструментом.').optional(),
  body('visible').optional(),
]
