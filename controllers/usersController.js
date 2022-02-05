const users = require('express').Router();
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const usersService = require('../services/usersService');
const { userSchema } = require('../validation/schemas');

users.post('/', rescue(async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return next(error);

  const newUser = await usersService.create(req.body);

  if (newUser.error) return next(newUser.error);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: newUser }, process.env.JWT_SECRET, jwtConfig);

  return res.status(201).json({ token });
}));

module.exports = users;
