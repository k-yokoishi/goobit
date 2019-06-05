import { createSlice } from 'redux-starter-kit';

const initialState = {
  text: '',
};

const goal = createSlice({
  slice: 'goal',
  initialState,
  reducers: {
    initialize: () => initialState,
    update: (state, action) => {
      Object.assign(state, { text: action.payload.text });
    },
  },
});

export const {
  reducer,
  actions: { initialize, update },
} = goal;
