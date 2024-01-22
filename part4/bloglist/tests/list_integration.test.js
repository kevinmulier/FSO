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

test('new blog without likes property still get 0 in likes property', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Stringer',
    url: 'Stringy',
  };

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(savedBlog.body.likes).toBe(0);
});

test("new blog without title property doesn't get saved", async () => {
  const newBlog = {
    author: 'Stringer',
    url: 'Stringy',
    likes: 0,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(blogs.length);
});

test("new blog without url property doesn't get saved", async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Stringer',
    likes: 0,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(blogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
