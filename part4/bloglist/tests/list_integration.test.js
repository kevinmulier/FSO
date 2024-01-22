const supertest = require('supertest');
const mongoose = require('mongoose');
const listHelper = require('../utils/list_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

const emptyList = listHelper.emptyList;
const listWithOneBlog = listHelper.listWithOneBlog;
const blogs = listHelper.blogs;

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogs.length);
});

test('unique identifier for blog is id property', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('new blog get saved', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Stringer',
    url: 'Stringy',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(blogs.length + 1);

  const titles = blogsAtEnd.body.map((r) => r.title);
  expect(titles).toContain('new blog');
});

afterAll(async () => {
  await mongoose.connection.close();
});
