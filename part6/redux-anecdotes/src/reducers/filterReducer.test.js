import deepFreeze from 'deep-freeze';
import filterReducer, { filterChange } from './filterReducer';

describe('filterReducer', () => {
  it('should return the initial state', () => {
    expect(filterReducer(undefined, {})).toEqual('');
  });

  it('should handle SET_FILTER action', () => {
    const startState = '';
    const action = {
      type: 'SET_FILTER',
      payload: 'completed',
    };

    deepFreeze(startState);
    const expectedResult = 'completed';
    expect(filterReducer(startState, action)).toEqual(expectedResult);
  });
});

describe('filterChange action creator', () => {
  it('should create an action to change the filter', () => {
    const filter = 'active';
    const expectedAction = {
      type: 'SET_FILTER',
      payload: filter,
    };
    expect(filterChange(filter)).toEqual(expectedAction);
  });
});
