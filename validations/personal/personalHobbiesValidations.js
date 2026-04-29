import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, REGEX_STRING } from "../../lib/constants/index.js";

export const personalHobbiesValidation = [
  body('sectionTitle')
    .optional()
    .isString()
    .trim()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`)
    .matches(REGEX_STRING)
    .withMessage('Please use only letters and spaces!'),

  body('hobbies')
    .isArray({ min: 1 })
    .withMessage('Add at least one hobby!'),

  body('hobbies.*.hobby')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .isString()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),
];
