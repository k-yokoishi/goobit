import { reducer, initialize, update } from '../goal';

describe('reducer', () => {
  it('initializes state', () => {
    expect(reducer({ text: 'default' }, initialize())).toEqual({ text: '' });
  });
  it('updates text', () => {
    expect(reducer({ text: 'default' }, update({ text: 'updated' }))).toEqual({
      text: 'updated',
    });
  });
});
