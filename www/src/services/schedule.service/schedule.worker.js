const { parentPort } = require('worker_threads');

const { getRssBatch } = require('../../api/api');
const { connectDatabase } = require('../../config/db.connect');
const { Post } = require('../../model/post.schema');
const { Creator } = require('../../model/creator.schema');
const { Category } = require('../../model/category.schema');
const { prepareNewCreators, prepareNewCategories } = require('../../helpers/service.helpers');

(async function () {
  try {
    // TODO: remove logs
    await connectDatabase();
    console.log('Start parsing...' + '\n');
    console.time('parsing');
    const rssDataArray = await getRssBatch();

    if (!Array.isArray(rssDataArray) || !rssDataArray.length) {
      return null;
    }

    const newCreators = prepareNewCreators(rssDataArray);
    const newCategories = prepareNewCategories(rssDataArray);

    Category.insertMany(newCategories, { ordered: false }, (err) => {
      if (err && err?.code !== 11000) console.log(err);
    });
    Creator.insertMany(newCreators, { ordered: false }, (err) => {
      if (err && err?.code !== 11000) console.log(err);
    });

    rssDataArray.forEach(async (post) => {
      const currentPost = await Post.findOne({ title: post.title });

      if (!currentPost) {
        const creator = await Creator.findOne({ name: post.creator });
        const categories = await Category.find({ name: { $in: post.categories } }, '_id');
        const newPost = new Post({ ...post, creator, categories });
        console.log('new post: ', newPost?.title);

        await newPost.save((err) => {
          if (err && err?.code !== 11000) console.log('New Post insertion error:', err);
        });
      }
    });
    // TODO: remove logs
    console.log('End parsing...' + '\n');
    console.timeEnd('parsing');
  } catch (error) {
        if (error && error?.code !== 11000) console.log('Worker error: ', error);
  } finally {
        parentPort.postMessage('Worker has just finished parsing...')
  }
})();

