const dummy = (blogs) => {
  return 1;
};

const totalLikes = (posts) => {
  const sum = posts.reduce((acc, c) => acc + c.likes, 0);

  return sum;
};

module.exports = {
  dummy,
  totalLikes,
};
