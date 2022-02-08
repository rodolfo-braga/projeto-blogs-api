const { BlogPost, PostCategory, Category, User } = require('../models');

const create = async (post, user) => {
  const categories = await Category.findAll({ where: { id: [...post.categoryIds] } });

  if (categories.length !== post.categoryIds.length) {
    return { error: { code: 'badRequest', message: '"categoryIds" not found' } };
  }

  const postInfo = {
    ...post,
    userId: user.id,
  };

  const postCreated = await BlogPost.create(postInfo);
  
  post.categoryIds.forEach(async (id) => PostCategory.create({
    postId: postCreated.id,
    categoryId: id,
  }));

  const newPost = await BlogPost.findOne({
    where: { id: postCreated.id },
    attributes: { exclude: ['published', 'updated'] },
  });

  return newPost;
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }],
  });

  if (!post) return { error: { code: 'notFound', message: 'Post does not exist' } };

  return post;
};

const update = async (id, post, user) => {
  const postToBeEdited = await BlogPost.findOne({ where: { id } });

  if (postToBeEdited.userId !== user.id) {
    return { error: { code: 'unauthorized', message: 'Unauthorized user' } };
  }

  await BlogPost.update(post, { where: { id } });

  const updatedPost = await BlogPost.findOne({ 
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });

  return updatedPost;
};

const remove = async (id, user) => {
  const postToBeDeleted = await BlogPost.findOne({ where: { id } });

  if (!postToBeDeleted) return { error: { code: 'notFound', message: 'Post does not exist' } };

  if (postToBeDeleted.userId !== user.id) {
    return { error: { code: 'unauthorized', message: 'Unauthorized user' } };
  }

  return BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  getPosts,
  getById,
  update,
  remove,
};
