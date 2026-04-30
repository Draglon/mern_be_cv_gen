import { body } from 'express-validator'

import { EMPLOYMENT_TYPES, WORK_FORMATS } from "../../lib/constants/experiences.js";
import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, MAX_TEXTAREA_CONTENT_NORMAL_LENGTH } from "../../lib/constants/index.js";

export const personalExperienceValidation = [
  body('sectionTitle')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('recentPositionsCount')
    .optional({ values: 'falsy' })
    .toInt()
    .isInt({ min: 1 })
    .withMessage('Must be a positive number'),

  body('experiences')
    .isArray({ min: 1 })
    .withMessage('Add at least one experience!'),

  body('experiences.*')
    .isObject()
    .withMessage('Invalid experience item'),

  body('experiences.*.position')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('experiences.*.companyName')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('experiences.*.location')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('experiences.*.employmentType')
    .isIn(EMPLOYMENT_TYPES)
    .withMessage('Invalid employment type'),

  body('experiences.*.workFormat')
    .isIn(WORK_FORMATS)
    .withMessage('Invalid work format'),

  body('experiences.*.description')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_TEXTAREA_CONTENT_NORMAL_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_TEXTAREA_CONTENT_NORMAL_LENGTH} characters!`),

  body('experiences.*.startDate')
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isISO8601()
    .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('experiences.*.endDate')
    .optional({ values: 'falsy' })
    .isISO8601()
    .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('experiences.*.isCurrent')
    .optional({ values: 'falsy' })
    .isBoolean(),

  body('experiences.*.skills')
    .isArray({ min: 1 })
    .withMessage('Add at least one skill!'),

  body('experiences.*.skills.*')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('experiences').custom((experiences) => {
    for (const exp of experiences) {
      if (exp.endDate && new Date(exp.endDate) < new Date(exp.startDate)) {
        throw new Error('End date must be greater than start date');
      }
    }
    return true;
  }),
];
