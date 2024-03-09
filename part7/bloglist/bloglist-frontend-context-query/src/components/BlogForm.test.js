import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('call createBlog with the right details when adding a blog', async () => {
  const mockHandler = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={mockHandler} />);

  const titleInput = screen.getByPlaceholderText('title', { exact: false });
  const authorInput = screen.getByPlaceholderText('author', { exact: false });
  const urlInput = screen.getByPlaceholderText('url', { exact: false });
  const submitButton = screen.getByText('create');

  const expectedBlogObject = {
    title: 'How to test your blog',
    author: 'The blog tester',
    url: 'blogtest.com',
  };

  await user.type(titleInput, 'How to test your blog');
  await user.type(authorInput, 'The blog tester');
  await user.type(urlInput, 'blogtest.com');

  await user.click(submitButton);

  expect(mockHandler.mock.calls[0][0]).toStrictEqual(expectedBlogObject);
});
