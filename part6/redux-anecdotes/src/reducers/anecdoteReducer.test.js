import anecdoteReducer from './anecdoteReducer';
import deepFreeze from 'deep-freeze';

describe('anecdote reducer', () => {
  const initialState = [
    {
      content: 'Anecdote 1',
      id: 0,
      votes: 0,
    },
    {
      content: 'Anecdote 2',
      id: 1,
      votes: 0,
    },
  ];

  test('returns new state with action anecdotes/createAnecdote', () => {
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: 'Anecdote 3',
    };

    deepFreeze(initialState);
    const newState = anecdoteReducer(initialState, action);

    expect(newState).toHaveLength(3);
  });

  test('returns new state with action anecdotes/vote', () => {
    const action = {
      type: 'anecdotes/vote',
      payload: 1,
    };

    deepFreeze(initialState);
    const newState = anecdoteReducer(initialState, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(initialState[0]);
    expect(newState).toContainEqual({
      content: 'Anecdote 2',
      id: 1,
      votes: 1,
    });
  });
});
