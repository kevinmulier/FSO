import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import blogService from '../services/blogs';

describe('<Blog />', () => {
  let container;
  let mockIncreaseLikes;
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
    mockIncreaseLikes = jest.fn();

    container = render(
      <Blog
        blog={blog}
        user={user}
        setSuccessMessage={() => {}}
        setErrorMessage={() => {}}
        setBlogs={() => {}}
        increaseLikes={mockIncreaseLikes}
      />,
    ).container;
  });

  test('initially render author and title', async () => {
    await screen.findByText('The blog tester', { exact: false });
    await screen.findByText('Blog testing', { exact: false });
  });

  test('do not render url and likes initially', () => {
    const div = container.querySelector('.togglable-content');
    expect(div).toHaveStyle('display: none');
  });

  test('render url and likes after clicking show details button', async () => {
    const user = userEvent.setup();

    const button = screen.getByText('show');
    await user.click(button);

    const div = container.querySelector('.togglable-content');
    expect(div).not.toHaveStyle('display: none');
  });

  test('do not render url and likes after clicking show details button twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show');

    await user.click(button);
    await user.click(button);

    const div = container.querySelector('.togglable-content');
    expect(div).toHaveStyle('display: none');
  });

  test('called 2 times the event handler after clicking like button twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('like');

    await user.click(button);
    await user.click(button);

    expect(mockIncreaseLikes.mock.calls).toHaveLength(2);
  });
});
