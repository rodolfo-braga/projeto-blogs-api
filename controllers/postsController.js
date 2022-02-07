const posts = require('express').Router();
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');

const postsService = require('../services/postsService');
const { postSchema } = require('../validation/schemas');

posts.post('/', validateJWT, rescue(async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) return next(error);

  const newPost = await postsService.create(req.body, req.user);
  if (newPost.error) return next(newPost.error);

  return res.status(201).json(newPost);
}));

posts.get('/:id', validateJWT, rescue(async (req, res, next) => {
  const post = await postsService.getById(req.params.id);

  if (post.error) return next(post.error);

  return res.status(200).json(post);
}));

posts.get('/', validateJWT, rescue(async (req, res) => {
  const allPosts = await postsService.getPosts();

  return res.status(200).json(allPosts);
}));

module.exports = posts;
