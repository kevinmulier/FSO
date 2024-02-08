import reducer from './anecdoteReducer';
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

  test('returns new state with action NEW_ANECDOTE', () => {
    const action = {
      type: 'NEW_ANECDOTE',
      payload: {
        content: 'Anecdote 3',
      },
    };

    deepFreeze(initialState);
    const newState = reducer(initialState, action);

    expect(newState).toHaveLength(3);
  });

  test('returns new state with action VOTE', () => {
    const action = {
      type: 'VOTE',
      payload: {
        id: 1,
      },
    };

    deepFreeze(initialState);
    const newState = reducer(initialState, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(initialState[0]);
    expect(newState).toContainEqual({
      content: 'Anecdote 2',
      id: 1,
      votes: 1,
    });
  });
});
