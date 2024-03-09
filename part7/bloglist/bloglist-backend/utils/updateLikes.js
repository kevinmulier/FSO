const updateLikesCheck = (blog, oldBlog) => {
  if (blog.likes > oldBlog.likes + 1) {
    console.log('likes too high');
    blog.likes = oldBlog.likes + 1;
  }

  if (blog.likes < oldBlog.likes) {
    console.log('likes too low');
    blog.likes = oldBlog.likes;
  }

  return blog.likes;
};

module.exports = {
  updateLikesCheck,
};
