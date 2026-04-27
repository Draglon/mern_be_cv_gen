import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, MAX_TEXTAREA_CONTENT_NORMAL_LENGTH } from "../../lib/constants/index.js";

export const personalCoursesValidation = [
  body('sectionTitle')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('courses')
    .isArray({ min: 1 })
    .withMessage('Add at least one course!'),

  body('courses.*.course')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('courses.*.description')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_TEXTAREA_CONTENT_NORMAL_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_TEXTAREA_CONTENT_NORMAL_LENGTH} characters!`),

  body('courses.*.startDate')
    .notEmpty()
    .withMessage('Field is required!'),
    // .bail()
    // .isISO8601({ strict: true })
    // .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('courses.*.endDate')
    .notEmpty()
    .withMessage('Field is required!'),
    // .bail()
    // .isISO8601({ strict: true })
    // .withMessage('The date must be in the format YYYY-MM-DD.'),
];
