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

afterAll(async () => {
  await mongoose.connection.close();
});
