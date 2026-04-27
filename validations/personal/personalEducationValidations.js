import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH } from "../../lib/constants/index.js";

export const personalEducationValidation = [
  body('sectionTitle')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('education')
    .isArray({ min: 1 })
    .withMessage('Add at least one education!'),

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

  body('education.*.startDate')
    .notEmpty()
    .withMessage('Field is required!'),
    // .bail()
    // .isISO8601({ strict: true })
    // .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('education.*.endDate')
    .notEmpty()
    .withMessage('Field is required!'),
    // .bail()
    // .isISO8601({ strict: true })
    // .withMessage('The date must be in the format YYYY-MM-DD.'),
];
