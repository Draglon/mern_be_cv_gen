import { body } from 'express-validator';

import {
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NIKE_NAME_LENGTH,
  MAX_NIKE_NAME_LENGTH,
} from "../lib/constants/index.js";

export const loginValidation = [
  body('email', 'Неверный формат почты').trim().isEmail().isLength({ max: MAX_EMAIL_LENGTH }),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').trim().isEmail().isLength({ max: MAX_EMAIL_LENGTH }),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH }),
  body('userName', 'Имя пользователя должно быть минимум 3 символа').isLength({ min: MIN_NIKE_NAME_LENGTH, max: MAX_NIKE_NAME_LENGTH }),
];
