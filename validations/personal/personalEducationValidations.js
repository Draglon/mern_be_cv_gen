import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, REGEX_STRING } from "../../lib/constants/index.js";

export const personalEducationValidation = [
  body('sectionTitle')
    .optional({ values: 'falsy' })
    .isString()
    .trim()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`)
    .matches(REGEX_STRING)
    .withMessage('Please use only letters and spaces!'),

  body('education')
    .isArray({ min: 1 })
    .withMessage('Add at least one education!'),

  body('education.*')
    .isObject()
    .withMessage('Invalid education item'),

  body('education.*.institute')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('education.*.degree')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('education.*.faculty')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('education.*.specialization')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('education.*.isCurrent')
    .optional({ values: 'falsy' })
    .isBoolean(),

  body('education.*.startDate')
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isISO8601({ strict: true })
    .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('education.*.endDate')
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isISO8601({ strict: true })
    .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('education').custom((education) => {
    for (const item of education) {
      if (new Date(item.endDate) < new Date(item.startDate)) {
        throw new Error('End date must be greater than start date');
      }
    }
    return true;
  }),
];
