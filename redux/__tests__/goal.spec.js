import { goalReducer, initialize, update } from '../goal';

describe('goalReducer', () => {
  it('initializes state', () => {
    expect(goalReducer({ text: 'default' }, initialize())).toEqual({ text: '' });
  });
  it('updates text', () => {
    expect(goalReducer({ text: 'default' }, update({ text: 'updated' }))).toEqual({
      text: 'updated',
    });
  });
});
