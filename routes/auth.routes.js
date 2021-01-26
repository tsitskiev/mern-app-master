const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const configAuth = require('config');

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Min pass length is 6 symbols').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Wrong data' });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'User already registered' });
      }
      const hashedPass = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPass });
      await user.save();
      res.status(201).json({ message: 'User successfully registered' });
    } catch (e) {
      res.status(500).json({ message: 'An error occured due to server request, please try again' });
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter the password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Wrong user info' });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password, please try again' });
      }
      const token = jwt.sign({ userId: user.id }, configAuth.get('jwtSecret'), {
        expiresIn: '1h',
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({
        message: 'An error occured due to login request, please try again',
      });
    }
  },
);

module.exports = router;
