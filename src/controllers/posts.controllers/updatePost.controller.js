const { PostsService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const updatePost = async (req, res, next) => {
  const post = await PostsService.updatePost(req.params, req.body);

  if (isErrorOrFalsyValue(post)) {
    return next(post);
  }

  res.status(200).json({ message: 'success', data: post });
};

module.exports = { updatePost };
