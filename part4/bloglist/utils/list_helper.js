const _ = require('lodash');

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

module.exports = {
  dummy,
  totalLikes,
  blogWithMostLikes,
  mostBlogs,
};
