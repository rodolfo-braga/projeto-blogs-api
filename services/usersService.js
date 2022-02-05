const { User } = require('../models');

const create = async (userInfo) => {
  const existingUser = await User.findOne({ where: { email: userInfo.email } });

  if (existingUser) return { error: { code: 'conflict', message: 'User already registered' } };

  const newUser = await User.create(userInfo);

  return newUser.dataValues;
};

module.exports = {
  create,
};
