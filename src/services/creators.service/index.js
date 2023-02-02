const { Creator } = require('../../model/creator.schema');
const { BadRequest } = require('http-errors');
const { isValidPaginationInRequest, getPageAndLimitFromRequest } = require('../../helpers/service.helpers');

const removeAllCreators = async () => {
  try {
    return await Creator.deleteMany({});
  } catch (error) {
    return error;
  }
};

const getAllCreators = async (req) => {
  try {
    const paginationOptions = { page: 1, limit: 20 };

    if (isValidPaginationInRequest(req)) {
      const { page, limit } = getPageAndLimitFromRequest(req);

      paginationOptions.skip = (page - 1) * limit;
      paginationOptions.limit = limit;
      paginationOptions.page = page;
    }

    const creators = await Creator.find({}).sort('name').lean();
    // const creators = await Creator.find({}, null, paginationOptions).sort('name').lean();
    const total = await Creator.find({}).count();

    return { creators, pagination: { page: paginationOptions.page, limit: paginationOptions.limit, total } };
  } catch (error) {
    return error;
  }
};

const addCreator = async (req, _, next) => {
  try {
    const { name } = req.body;

    const creator = await Creator.findOne({ name });

    if (creator) {
      return new BadRequest('Creator with this name has already existed');
    }

    const newCreator = new Creator({ name });

    return await newCreator.save();
  } catch (error) {
    return error;
  }
};

const removeCreatorsByIds = async (params) => {
  try {
    const ids = typeof params?.ids === 'string' ? params?.ids : '';
    return await Creator.deleteMany({ _id: { $in: ids.split(',') } });
  } catch (error) {
    return error;
  }
};

module.exports = { removeAllCreators, addCreator, removeCreatorsByIds, getAllCreators };
