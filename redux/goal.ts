import { createSlice, PayloadAction } from 'redux-starter-kit';

interface State {
  text: string
}
const initialState = {
  text: '',
};

const goal = createSlice({
  slice: 'goal',
  initialState,
  reducers: {
    initialize: () => initialState,
    update: (state: State, action: PayloadAction<State>) => {
      Object.assign(state, { text: action.payload.text });
    },
  },
});

export const {
  reducer,
  actions: { initialize, update },
} = goal;
