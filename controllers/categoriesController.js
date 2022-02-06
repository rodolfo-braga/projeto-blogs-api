const categories = require('express').Router();
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');
const categoriesService = require('../services/categoriesService');

const { categorySchema } = require('../validation/schemas');

categories.post('/', validateJWT, rescue(async (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return next(error);

  const newCategory = await categoriesService.create(req.body);
  if (newCategory.error) return next(newCategory.error);

  return res.status(201).json(newCategory);
}));

categories.get('/', validateJWT, rescue(async (req, res) => {
  const allCategories = await categoriesService.getCategories();

  return res.status(200).json(allCategories);
}));

module.exports = categories;
