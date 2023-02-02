const { CreatorService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const addCreator = async (req, res, next) => {
  const creator = await CreatorService.addCreator(req);

  if (isErrorOrFalsyValue(creator)) {
    return next(creator);
  }

  res.status(201).json({ message: 'success', data: creator });
};

const getAllCreators = async (req, res, next) => {
  const { creators, pagination } = await CreatorService.getAllCreators(req);

  if (isErrorOrFalsyValue(creators)) {
    return next(creators);
  }

  res.status(200).json({ message: 'success', data: { creators, pagination } });
};

const removeCreatorsByIds = async (req, res, next) => {
  const creators = await CreatorService.removeCreatorsByIds(req.params);

  if (isErrorOrFalsyValue(creators)) {
    return next(creators);
  }

  res.status(200).json({ message: 'success' });
};

module.exports = { addCreator, getAllCreators, removeCreatorsByIds };
