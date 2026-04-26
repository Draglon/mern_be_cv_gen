import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, MAX_TEXTAREA_CONTENT_NORMAL_LENGTH } from "../../lib/constants/index.js";

export const personalExperienceValidation = [
  body('sectionTitle')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('lastPlacesOfWorks')
    .optional({ values: 'falsy' })
    .toInt()
    .isInt({ min: 1 })
    .withMessage('Must be a positive number'),

  body('experiences')
    .isArray({ min: 1 })
    .withMessage('Add at least one experience!'),

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
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('experiences.*.placeOfWork')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

  body('experiences.*.workingTime')
    .trim()
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`),

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
    .isISO8601({ strict: true })
    .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('experiences.*.endDate')
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isISO8601({ strict: true })
    .withMessage('The date must be in the format YYYY-MM-DD.'),

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
];
