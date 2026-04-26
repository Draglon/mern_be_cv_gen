import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH } from "../../lib/constants/index.js";

export const personalHobbiesValidation = [
  body('sectionTitle')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('hobbies')
    .isArray({ min: 1 })
    .withMessage('Add at least one hobby!'),

  body('hobbies.*.hobby')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .isString()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),
];
