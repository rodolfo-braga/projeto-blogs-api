const users = require('express').Router();
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const validateJWT = require('../auth/validateJWT');

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

users.get('/:id', validateJWT, rescue(async (req, res, next) => {
  const user = await usersService.getById(req.params.id);
  console.log(user);
  if (user.error) return next(user.error);

  return res.status(200).json(user);
}));

users.get('/', validateJWT, rescue(async (req, res) => {
  const allUsers = await usersService.getUsers();

  return res.status(200).json(allUsers);
}));

users.delete('/me', validateJWT, rescue(async (req, res) => {
  await usersService.remove(req.user.id);

  return res.status(204).end();
}));

module.exports = users;
