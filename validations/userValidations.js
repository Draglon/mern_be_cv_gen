import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Неверный формат почты').trim().isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
]

export const registerValidation = [
  body('email', 'Неверный формат почты').trim().isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('userName', 'Имя пользователя должно быть минимум 3 символа').isLength({ min: 3 }),
  // body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]
