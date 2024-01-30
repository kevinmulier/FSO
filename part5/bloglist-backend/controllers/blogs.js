const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!request.user) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const user = request.user;

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user.id,
    likes: 0,
  });

  const savedBlog = await blog.save();
  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
  });
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(populatedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }
  const blogCreator = await User.findById(blog.user.toString());

  if (!request.user) {
    return response.status(401).json({ error: 'invalid token' });
  }
  const user = request.user;

  if (blogCreator.id.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: 'unauthorized action' });
  }
});

module.exports = blogsRouter;
