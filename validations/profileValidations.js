import { body } from 'express-validator';

import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_NIKE_NAME_LENGTH,
  MAX_NIKE_NAME_LENGTH,
  REGEX_MANE,
  REGEX_USER_MANE,
  REGEX_IMAGE_BASE64_FORMATS,
} from "../lib/constants/index.js";

export const profileValidation = [
  body('avatarUrl')
    .trim()
    .optional({ values: 'falsy' })
    .matches(REGEX_IMAGE_BASE64_FORMATS)
    .withMessage('Invalid base64 image format'),

  body('firstName')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH })
    .withMessage(`First name must be ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} characters!`)
    .matches(REGEX_MANE)
    .withMessage('Use only letters, hyphens, or apostrophes in your first name!'),

  body('lastName')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH })
    .withMessage(`Last name must be ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} characters!`)
    .matches(REGEX_MANE)
    .withMessage('Use only letters, hyphens, or apostrophes in your last name!'),

  body('userName')
    .trim()
    .notEmpty()
    .withMessage('Username is required!')
    .isLength({ min: MIN_NIKE_NAME_LENGTH, max: MAX_NIKE_NAME_LENGTH })
    .withMessage(`Username must be ${MIN_NIKE_NAME_LENGTH}-${MAX_NIKE_NAME_LENGTH} characters!`)
    .matches(REGEX_USER_MANE)
    .withMessage('Username can contain only letters, numbers and underscores!'),
];
