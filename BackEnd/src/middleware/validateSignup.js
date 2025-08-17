import { body, validationResult } from 'express-validator';
import fetch from 'node-fetch';
import localUniversities from "../data/fallBackSchools.js";
import { regex } from '../helpers/regex.js';  

const isValidUniversity = async (schoolName) => {
  if (localUniversities.includes(schoolName)) return true;

  const res = await fetch(
    `http://universities.hipolabs.com/search?name=${encodeURIComponent(schoolName)}&country=Pakistan`
  );
  if (!res.ok) return false;

  const data = await res.json();
  return data.some(u => u.name.toLowerCase() === schoolName.toLowerCase());
};

const isValidCountry = async (countryName) => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name`
    );

    if (res.status === 404) return false;
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    return data.some(
      c => c.name?.common?.toLowerCase() === countryName.toLowerCase()
    );
  } catch (err) {
    console.error("Error validating country:", err.message);
    return false;
  }
};

const validateSignup = [
  body('email')
    .matches(regex.email).withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .matches(regex.password).withMessage('Password must be at least 8 characters, contain one number and one letter'),
  body('userName')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  body('linkedin')
    .optional()
    .matches(regex.linkedin).withMessage('Invalid LinkedIn URL'),
  body('github')
    .optional()
    .matches(regex.github).withMessage('Invalid GitHub URL'),
  body('profilePicture')
    .optional()
    .matches(regex.profilePicture).withMessage('Profile picture must be a valid image URL (.png, .jpg, etc.)'),
  body('school')
    .trim()
    .notEmpty().withMessage('School name is required')
    .bail()
    .custom(async (value) => {
      const valid = await isValidUniversity(value);
      if (!valid) throw new Error('School not recognized. Make sure you enter a known institution.');
      return true;
    }),
  body('experience')
    .isInt({ min: 0, max: 80 }).withMessage('Experience must be an integer between 0 and 80'),
  body('country')
    .trim()
    .notEmpty().withMessage('Country is required')
    .custom(async (value) => {
      const valid = await isValidCountry(value);
      if (!valid) throw new Error('Country not recognized. Please enter a valid country name.');
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateSignup;
