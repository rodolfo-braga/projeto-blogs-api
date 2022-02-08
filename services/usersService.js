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

const getById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) return { error: { code: 'notFound', message: 'User does not exist' } };

  return user;
};

const remove = async (id) => User.destroy({ where: { id } });

module.exports = {
  create,
  findByEmailAndPassword,
  getUsers,
  getById,
  remove,
};
