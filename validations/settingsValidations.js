import { body } from 'express-validator';

import {
  MIN_NIKE_NAME_LENGTH,
  MAX_NIKE_NAME_LENGTH,
  REGEX_USER_MANE,
} from "../lib/constants/index.js";

export const deleteAccountValidation = [
  body('userName')
    .trim()
    .notEmpty()
    .withMessage('Username is required!')
    .isLength({ min: MIN_NIKE_NAME_LENGTH, max: MAX_NIKE_NAME_LENGTH })
    .withMessage(`Username must be ${MIN_NIKE_NAME_LENGTH}-${MAX_NIKE_NAME_LENGTH} characters!`)
    .matches(REGEX_USER_MANE)
    .withMessage('Username can contain only letters, numbers and underscores!'),
];
