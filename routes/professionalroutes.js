const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Professional = require('../models/professional');
const profController = require('../controllers/profcontrollers');
const { userInfo } = require('os');
const passport = require('passport');
const { protectProfessional } = require('../middleware/auth');

router.post('/signup', profController.post_signup);
router.post('/login', profController.post_login);
router.post('/verify-otp', [protectProfessional], profController.verifyOtp);
router.put('/regenerate-otp', [protectProfessional], profController.regenerateOtp);
router.get('/me', [protectProfessional], profController.getMe);

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

// callback for google auth
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/');
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  // res.redirect("http://localhost:3000/");
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
