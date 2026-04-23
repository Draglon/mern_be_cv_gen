import { body } from 'express-validator';

import {
  MIN_NIKE_NAME_LENGTH,
  MAX_NIKE_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  REGEX_USER_MANE,
  REGEX_DIGITS,
  REGEX_LETTERS,
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

export const changeEmailValidation = [
  body('newEmail')
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
    .withMessage('Password is required!'),
];

export const changePasswordValidation = [
  body('currentPassword')
    .trim()
    .notEmpty()
    .withMessage('Current password is required!'),

  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('New password is required!')
    .isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })
    .withMessage(`Password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters!`)
    .matches(REGEX_DIGITS)
    .withMessage('Password must contain at least one number!')
    .matches(REGEX_LETTERS)
    .withMessage('Password must contain at least one uppercase letter!'),
];
