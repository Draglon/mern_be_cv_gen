import { body } from 'express-validator'

import {
  MIN_INPUT_LENGTH,
  MAX_INPUT_LENGTH,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_LEVEL_NUMBER,
  MAX_LEVEL_NUMBER,
  REGEX_STRING,
} from "../../lib/constants/index.js";

export const personalSkillsValidation = [
  body('sectionTitle')
    .optional({ values: 'falsy' })
    .isString()
    .trim()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`)
    .matches(REGEX_STRING)
    .withMessage('Please use only letters and spaces!'),

  body('skills.*')
    .isObject()
    .withMessage('Invalid skill item'),

  body('skills.*.skill')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isString()
    .isLength({ min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH })
    .withMessage(`Must be ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} characters!`),

  body('skills.*.level')
    .toInt()
    .isInt({ min: MIN_LEVEL_NUMBER, max: MAX_LEVEL_NUMBER })
    .withMessage(`Must be between ${MIN_LEVEL_NUMBER} and ${MAX_LEVEL_NUMBER}`),

  body('skills.*.visible')
    .toBoolean()
    .isBoolean()
    .withMessage('Must be a boolean'),
];
