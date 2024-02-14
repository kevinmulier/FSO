import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return '';
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(addNotification(content));
    setTimeout(() => dispatch(removeNotification()), seconds * 1000);
  };
};

export default notificationSlice.reducer;
