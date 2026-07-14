import { body } from 'express-validator'

import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH, MAX_TEXTAREA_CONTENT_NORMAL_LENGTH, REGEX_STRING } from "../../lib/constants/index.js";

export const personalCoursesValidation = [
  body('sectionTitle')
    .optional({ values: 'falsy' })
    .isString()
    .trim()
    .isLength({ min: MIN_INPUT_LENGTH, max: MAX_INPUT_LENGTH })
    .withMessage(`Must be ${MIN_INPUT_LENGTH}-${MAX_INPUT_LENGTH} characters!`)
    .matches(REGEX_STRING)
    .withMessage('Please use only letters and spaces!'),

  body('courses.*')
    .isObject()
    .withMessage('Invalid course item'),

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

  body('courses.*.isCurrent')
    .optional()
    .toBoolean()
    .isBoolean(),

  body('courses.*.startDate')
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isISO8601({ strict: true })
    .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('courses.*.endDate')
    .if((_, { req, path }) => {
      const match = path.match(/courses\.(\d+)\.endDate/);

      if (!match) {
        return false;
      }

      const index = Number(match[1]);

      return !req.body.courses[index].isCurrent;
    })
    .notEmpty()
    .withMessage('Field is required!')
    .bail()
    .isISO8601()
    .withMessage('The date must be in the format YYYY-MM-DD.'),

  body('courses').custom((courses) => {
    for (const exp of courses) {
      if (exp.isCurrent) {
        continue;
      }

      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate);

      if (
        !Number.isNaN(start.getTime()) &&
        !Number.isNaN(end.getTime()) &&
        end < start
      ) {
        throw new Error('End date must be greater than start date');
      }
    }

    return true;
  }),
];
