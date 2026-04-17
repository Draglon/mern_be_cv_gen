import { body } from 'express-validator';

import {
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NIKE_NAME_LENGTH,
  MAX_NIKE_NAME_LENGTH,
} from "../lib/constants/index.js";

export const loginValidation = [
  body('email', `Invalid email format or email cannot exceed ${MAX_EMAIL_LENGTH} characters!`).trim().isEmail().isLength({ max: MAX_EMAIL_LENGTH }),
  body('password', `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters!`).isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH }),
];

export const registerValidation = [
  body('email', `Invalid email format or email cannot exceed ${MAX_EMAIL_LENGTH} characters!`).trim().isEmail().isLength({ max: MAX_EMAIL_LENGTH }),
  body('password', `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters!`).isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH }),
  body('userName', `Username must be between ${MIN_NIKE_NAME_LENGTH} and ${MAX_NIKE_NAME_LENGTH} characters!`).isLength({ min: MIN_NIKE_NAME_LENGTH, max: MAX_NIKE_NAME_LENGTH }),
];
