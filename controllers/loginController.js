const login = require('express').Router();
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const usersService = require('../services/usersService');
const { loginSchema } = require('../validation/schemas');

login.post('/', rescue(async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(error);
  
  const { email, password } = req.body;
  const user = await usersService.findByEmailAndPassword(email, password);

  if (user.error) return next(user.error);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);

  return res.status(200).json({ token });
}));

module.exports = login;
