import { body } from 'express-validator'

import {
  MIN_INPUT_LENGTH,
  MAX_INPUT_LENGTH,
  MAX_EMAIL_LENGTH,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MAX_TEXTAREA_CONTENT_NORMAL_LENGTH,
  REGEX_IMAGE_BASE64_FORMATS,
  REGEX_PHONE_NUMBER,
  REGEX_TELEGRAM,
} from "../../lib/constants/index.js";

export const personalInfoValidation = [
  body('sectionTitle')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('userUrl')
    .trim()
    .optional({ values: 'falsy' })
    .matches(REGEX_IMAGE_BASE64_FORMATS)
    .withMessage('Invalid base64 image format'),

  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH })
    .withMessage(`Must be ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} characters!`),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH })
    .withMessage(`Must be ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} characters!`),

  body('aboutMe')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_NAME_LENGTH, max: MAX_TEXTAREA_CONTENT_NORMAL_LENGTH })
    .withMessage(`Must be ${MIN_NAME_LENGTH}-${MAX_TEXTAREA_CONTENT_NORMAL_LENGTH} characters!`),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isEmail()
    .withMessage('Invalid email format!')
    .bail()
    .isLength({ max: MAX_EMAIL_LENGTH })
    .withMessage(`The length must not exceed ${MAX_EMAIL_LENGTH} characters!`),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ max: MAX_INPUT_LENGTH })
    .withMessage(`The length must not exceed ${MAX_EMAIL_LENGTH} characters!`),

  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .matches(REGEX_PHONE_NUMBER)
    .withMessage('Invalid phone number format!'),

  body('birthday')
    .notEmpty()
    .withMessage('Field is required!'),
    // .bail()
    // .isISO8601({ strict: true })
    // .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('telegram')
    .trim()
    .optional({ values: 'falsy' })
    .matches(REGEX_TELEGRAM)
    .withMessage('Incorrect Telegram username!'),

  body('linkedIn')
    .trim()
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Incorrect LinkedIn URL!'),

  body('portfolio')
    .trim()
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Incorrect portfolio URL!'),
];
