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

module.exports = {
  dummy,
  totalLikes,
  blogWithMostLikes,
};
