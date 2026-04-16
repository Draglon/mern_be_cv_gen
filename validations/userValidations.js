import { body } from 'express-validator';

import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, MAX_EMAIL_LENGTH } from "../lib/constants/index.js";

export const loginValidation = [
  body('email', 'Неверный формат почты').trim().isEmail().isLength({ max: MAX_EMAIL_LENGTH }),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').trim().isEmail().isLength({ max: MAX_EMAIL_LENGTH }),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH }),
  body('userName', 'Имя пользователя должно быть минимум 3 символа').isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH }),
];
