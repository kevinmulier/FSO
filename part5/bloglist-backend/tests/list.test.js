const listHelper = require('./list_helper');

const emptyList = listHelper.emptyList;
const listWithOneBlog = listHelper.listWithOneBlog;
const blogs = listHelper.blogs;

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(38);
  });
});

describe('most liked blog', () => {
  test('is an empty object when array is empty', () => {
    const result = listHelper.blogWithMostLikes(emptyList);

    expect(result).toEqual({});
  });

  test('when list has only one blog is that blog', () => {
    const result = listHelper.blogWithMostLikes(listWithOneBlog);

    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('of a bigger list is the right one', () => {
    const result = listHelper.blogWithMostLikes(blogs);

    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('author with most blogs', () => {
  test('is an empty object when array is empty', () => {
    const result = listHelper.mostBlogs(emptyList);

    expect(result).toEqual({});
  });

  test('when list has only one blog is that blog author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('of a bigger list is the right one', () => {
    const result = listHelper.mostBlogs(blogs);

    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('author with most likes', () => {
  test('is an empty object when array is empty', () => {
    const result = listHelper.mostLikes(emptyList);

    expect(result).toEqual({});
  });

  test('when list has only one blog is that blog author', () => {
    const result = listHelper.mostLikes(listWithOneBlog);

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('of a bigger list is the right one', () => {
    const result = listHelper.mostLikes(blogs);

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
