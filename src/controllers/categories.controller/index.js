const { CategoryService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const addCategory = async (req, res, next) => {
  const category = await CategoryService.addCategory(req);

  if (isErrorOrFalsyValue(category)) {
    return next(category);
  }

  res.status(201).json({ message: 'success', data: category });
};

const getAllCategories = async (req, res, next) => {
  const { categories, pagination } = await CategoryService.getAllCategories(req);

  if (isErrorOrFalsyValue(categories)) {
    return next(categories);
  }

  res.status(200).json({ message: 'success', data: { categories, pagination } });
};

const removeCategoriesByIds = async (req, res, next) => {
  const categories = await CategoryService.removeCategoriesByIds(req.params);

  if (isErrorOrFalsyValue(categories)) {
    return next(categories);
  }

  res.status(200).json({ message: 'success' });
};

module.exports = { addCategory, getAllCategories, removeCategoriesByIds };
