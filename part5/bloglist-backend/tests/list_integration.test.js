const bcrypt = require('bcrypt');
const supertest = require('supertest');
const mongoose = require('mongoose');
const listHelper = require('./list_helper');
const testHelper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

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

describe('when there is initially some notes saved', () => {
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
});

describe('when adding a new blog', () => {
  let token = '';

  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', name: 'rootname', passwordHash });

    await user.save();

    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    token = response.body.token;
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(blogs.length + 1);

    const titles = blogsAtEnd.body.map((r) => r.title);
    expect(titles).toContain('new blog');
  });

  test('it returns a status 401 if token is not provided', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Stringer',
      url: 'Stringy',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(blogs.length);

    const titles = blogsAtEnd.body.map((r) => r.title);
    expect(titles).not.toContain('new blog');
  });

  test('new blog without likes property still get 0 in likes property', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Stringer',
      url: 'Stringy',
    };

    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(blogs.length);
  });

  test("new blog without url property doesn't get saved", async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Stringer',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(blogs.length);
  });
});

describe('when deleting a blog', () => {
  let token = '';
  let user = null;

  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    user = new User({ username: 'root', name: 'rootname', passwordHash });

    await user.save();

    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    token = response.body.token;
  });

  test('it succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs');

    const blogToDelete = blogsAtStart.body[0];
    await Blog.findByIdAndUpdate(blogToDelete.id, { user: user._id });

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1);

    const titles = blogsAtEnd.body.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("when updating a blog's likes", () => {
  test("blog's likes get updated but remaining properties doesn't change", async () => {
    const blogsAtStart = await api.get('/api/blogs');
    const blogToUpdate = blogsAtStart.body[0];

    const updatedBlog = {
      likes: blogToUpdate.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await api.get('/api/blogs');

    expect(blogsAtEnd.body[0].likes).toBe(blogToUpdate.likes + 1);
    expect(blogsAtEnd.body[0].author).toBe(blogToUpdate.author);
    expect(blogsAtEnd.body[0].url).toBe(blogToUpdate.url);
    expect(blogsAtEnd.body[0].title).toBe(blogToUpdate.title);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'admin', passwordHash });

    await user.save();
  });

  test('creation succeeds with a new username', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'kevinm',
      name: 'Kevin Mulier',
      password: '123456789',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with a username that is not unique', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'admin',
      name: 'Kevin Mulier',
      password: '123456789',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with a username too short', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'ke',
      name: 'Kevin Mulier',
      password: '123456789',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with a password too short', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'kevinm',
      name: 'Kevin Mulier',
      password: '12',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
