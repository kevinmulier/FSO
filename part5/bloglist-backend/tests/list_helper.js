const _ = require('lodash');

const emptyList = [];

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.reduce((acc, c) => acc + c.likes, 0);

  return sum;
};

const blogWithMostLikes = (blogs) => {
  const mostLikedBlog = blogs.sort((a, b) => b.likes - a.likes)[0];

  return mostLikedBlog
    ? {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes,
      }
    : {};
};

const mostBlogs = (blogs) => {
  const authors = {};
  for (let blog of blogs) {
    authors[blog.author]
      ? (authors[blog.author] += 1)
      : (authors[blog.author] = 1);
  }

  const authorWithMostBlogs = _.sortBy(_.toPairs(authors), 1).reverse();

  return authorWithMostBlogs.length > 0
    ? {
        author: authorWithMostBlogs[0][0],
        blogs: authorWithMostBlogs[0][1],
      }
    : {};
};

const mostLikes = (blogs) => {
  const authors = {};
  for (let blog of blogs) {
    authors[blog.author]
      ? (authors[blog.author] += blog.likes)
      : (authors[blog.author] = 0 + blog.likes);
  }

  const authorWithMostLikes = _.sortBy(_.toPairs(authors), 1).reverse();

  return authorWithMostLikes.length > 0
    ? {
        author: authorWithMostLikes[0][0],
        likes: authorWithMostLikes[0][1],
      }
    : {};
};

module.exports = {
  emptyList,
  listWithOneBlog,
  blogs,
  dummy,
  totalLikes,
  blogWithMostLikes,
  mostBlogs,
  mostLikes,
};
