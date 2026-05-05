import { body } from 'express-validator'

import { LANGUAGE_LEVEL } from "../../lib/constants/languages.js";
import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, REGEX_STRING } from "../../lib/constants/index.js";

export const personalLanguagesValidation = [
  body('sectionTitle')
    .optional({ values: 'falsy' })
    .isString()
    .trim()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`)
    .matches(REGEX_STRING)
    .withMessage('Please use only letters and spaces!'),

  body('languages')
    .notEmpty()
    .withMessage('Languages are required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('Add at least one language!'),

  body('languages.*')
    .isObject()
    .withMessage('Invalid language item'),

  body('languages.*.language')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('languages.*.level')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isIn(LANGUAGE_LEVEL)
    .withMessage('Invalid language level'),
];
