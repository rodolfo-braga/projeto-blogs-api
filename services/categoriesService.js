const { Category } = require('../models');

const create = async (category) => {
  const existingCategory = await Category.findOne({ where: { name: category.name } });

  if (existingCategory) {
    return { error: { code: 'conflict', message: 'Category already registered' } };
  }
  
  const newCategory = await Category.create(category);

  return newCategory;
};

module.exports = {
  create,
};
