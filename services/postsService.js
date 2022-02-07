const { BlogPost, PostCategory, Category } = require('../models');

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

module.exports = {
  create,
};
