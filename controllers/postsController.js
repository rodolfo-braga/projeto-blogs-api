const posts = require('express').Router();
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');

const postsService = require('../services/postsService');
const { postSchema, updatePostSchema } = require('../validation/schemas');

posts.post('/', validateJWT, rescue(async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) return next(error);

  const newPost = await postsService.create(req.body, req.user);
  if (newPost.error) return next(newPost.error);

  return res.status(201).json(newPost);
}));

posts.get('/search', validateJWT, rescue(async (req, res) => {
  const { q: searchTerm } = req.query;
  const postsFiltered = await postsService.getPosts(searchTerm);

  return res.status(200).json(postsFiltered);
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

posts.put('/:id', validateJWT, rescue(async (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body);
  if (error) return next(error);

  const { params: { id }, body: post, user } = req;
  
  const updatedPost = await postsService.update(id, post, user);
  if (updatedPost.error) return next(updatedPost.error);

  return res.status(200).json(updatedPost);
}));

posts.delete('/:id', validateJWT, rescue(async (req, res, next) => {
  const { params: { id }, user } = req;
  
  const deletedPost = await postsService.remove(id, user);
  if (deletedPost.error) return next(deletedPost.error);

  return res.status(204).end();
}));

module.exports = posts;
