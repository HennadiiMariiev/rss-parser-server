const { Category } = require('../../model/category.schema');
const { BadRequest } = require('http-errors');

const { isValidPaginationInRequest, getPageAndLimitFromRequest } = require('../../helpers/service.helpers');

const removeAllCategories = async () => {
  try {
    return await Category.deleteMany({});
  } catch (error) {
    return error;
  }
};

const getAllCategories = async (req) => {
  try {
    const paginationOptions = { page: 1, limit: 20 };

    if (isValidPaginationInRequest(req)) {
      const { page, limit } = getPageAndLimitFromRequest(req);

      paginationOptions.skip = (page - 1) * limit;
      paginationOptions.limit = limit;
      paginationOptions.page = page;
    }

    const categories = await Category.find({}).sort('name').lean();
    // const categories = await Category.find({}, null, paginationOptions).sort('name').lean();
    const total = await Category.find({}).count();

    return { categories, pagination: { page: paginationOptions.page, limit: paginationOptions.limit, total } };
  } catch (error) {
    return error;
  }
};

const addCategory = async (req) => {
  try {
    const { name } = req.body;

    const category = await Category.findOne({ name });

    if (category) {
      return new BadRequest('Category with this name has already existed');
    }

    const newCategory = new Category({ name });
    return await newCategory.save();
  } catch (error) {
    return error;
  }
};

const removeCategoriesByIds = async (params) => {
  try {
    const ids = typeof params?.ids === 'string' ? params?.ids : '';
    return await Category.deleteMany({ _id: { $in: ids.split(',') } });
  } catch (error) {
    return error;
  }
};

module.exports = { removeAllCategories, addCategory, removeCategoriesByIds, getAllCategories };
