import deepFreeze from 'deep-freeze';
import filterReducer, { filterChange } from './filterReducer';

describe('filterReducer', () => {
  it('should return the initial state', () => {
    expect(filterReducer(undefined, {})).toEqual('');
  });

  it('should handle filter/changeFilter', () => {
    const startState = '';
    const action = {
      type: 'filter/filterChange',
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
      type: 'filter/filterChange',
      payload: filter,
    };
    expect(filterChange(filter)).toEqual(expectedAction);
  });
});
