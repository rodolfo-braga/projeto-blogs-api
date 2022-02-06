const { User } = require('../models');

const create = async (userInfo) => {
  const existingUser = await User.findOne({ where: { email: userInfo.email } });

  if (existingUser) return { error: { code: 'conflict', message: 'User already registered' } };

  const newUser = await User.create(userInfo);

  return newUser.dataValues;
};

const findByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password }, raw: true });

  if (!user) return { error: { code: 'badRequest', message: 'Invalid fields' } };

  return user;
};

const getUsers = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  create,
  findByEmailAndPassword,
  getUsers,
};
