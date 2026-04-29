import { body } from 'express-validator';

import {
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NIKE_NAME_LENGTH,
  MAX_NIKE_NAME_LENGTH,
  REGEX_HAS_DIGITS,
  REGEX_HAS_LETTERS,
  REGEX_USER_MANE,
} from "../lib/constants/index.js";

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Invalid email format!')
    .isLength({ max: MAX_EMAIL_LENGTH })
    .withMessage(`Email cannot exceed ${MAX_EMAIL_LENGTH} characters!`),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })
    .withMessage(`Password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters!`),
];

export const registerValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format!')
    .isLength({ max: MAX_EMAIL_LENGTH })
    .withMessage(`Email cannot exceed ${MAX_EMAIL_LENGTH} characters!`),

  body('password')
    .trim()
    .isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })
    .withMessage(`Password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters!`)
    .matches(REGEX_HAS_DIGITS)
    .withMessage('Password must contain at least one number!')
    .matches(REGEX_HAS_LETTERS)
    .withMessage('Password must contain at least one uppercase letter!'),

  body('userName')
    .trim()
    .isLength({ min: MIN_NIKE_NAME_LENGTH, max: MAX_NIKE_NAME_LENGTH })
    .withMessage(`Username must be ${MIN_NIKE_NAME_LENGTH}-${MAX_NIKE_NAME_LENGTH} characters!`)
    .matches(REGEX_USER_MANE)
    .withMessage('Username can contain only letters, numbers and underscores!'),
];