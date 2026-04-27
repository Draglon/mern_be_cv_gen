import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "../../lib/constants/index.js";

export const personalSkillsValidation = [
  body('sectionTitle')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('skills')
    .isArray({ min: 1 })
    .withMessage('Add at least one skill!'),

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
    .isInt({ min: 0, max: 100 })
    .withMessage('Must be between 0 and 100'),

  body('skills.*.visible')
    .toBoolean()
    .isBoolean()
    .withMessage('Must be a boolean'),
];
