import { body, validationResult } from 'express-validator';
import fetch from 'node-fetch';
import localUniversities from "../data/fallBackSchools.js"

const isValidUniversity = async (schoolName) => {
  // First, check local list
  if (localUniversities.includes(schoolName)) return true;

  // Else hit Hipolabs API
  const res = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(schoolName)}&country=Pakistan`);
  if (!res.ok) return false;

  const data = await res.json();
  return data.some(u => u.name.toLowerCase() === schoolName.toLowerCase());
};

const isValidCountry = async (countryName) => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name`
    );

    if (res.status === 404) {
      return false; // Country not found
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

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
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
  body('userName')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
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
