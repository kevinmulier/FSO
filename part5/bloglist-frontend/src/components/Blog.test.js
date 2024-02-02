import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  const blog = {
    id: '4514fs561f564f56ss2f1',
    title: 'Blog testing',
    author: 'The blog tester',
    likes: 5,
    url: 'Test URL',
    user: {
      id: '4454s87f946s4f4d',
      username: 'Username',
      name: 'Name',
    },
  };

  const user = {
    token: '4454s87f946s4f4d',
    username: 'Tester Username',
    name: 'Tester Name',
  };

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        user={user}
        setSuccessMessage={() => {}}
        setErrorMessage={() => {}}
        setBlogs={() => {}}
      />,
    ).container;
  });

  test('initially render author and title', async () => {
    await screen.findByText('The blog tester', { exact: false });
    await screen.findByText('Blog testing', { exact: false });
  });

  test('do not render url and likes initially', async () => {
    const likes = screen.queryByText('likes 5', { exact: false });
    const url = screen.queryByText('Test URL', { exact: false });

    expect(likes).toBeNull();
    expect(url).toBeNull();
  });
});
