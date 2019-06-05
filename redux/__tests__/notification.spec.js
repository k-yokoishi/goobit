import {
  initialize, set, remove, reducer,
} from '../notification';

describe('reducer', () => {
  it('initializes state', () => {
    expect(reducer({}, initialize())).toEqual({ notifications: [] });
  });
  it('sets notification', () => {
    expect(
      reducer(
        {
          notifications: [
            { habitId: 'a', notifId: 'A' },
            { habitId: 'b', notifId: 'B' },
            { habitId: 'c', notifId: 'C' },
          ],
        },
        set({ habitId: 'd', notifId: 'D' }),
      ),
    ).toEqual({
      notifications: [
        { habitId: 'a', notifId: 'A' },
        { habitId: 'b', notifId: 'B' },
        { habitId: 'c', notifId: 'C' },
        { habitId: 'd', notifId: 'D' },
      ],
    });
  });
  it('overwites notification', () => {
    expect(
      reducer(
        {
          notifications: [
            { habitId: 'a', notifId: 'A', notifyAt: new Date('2000-01-01').toJSON() },
            { habitId: 'b', notifId: 'B', notifyAt: new Date('2000-01-02').toJSON() },
            { habitId: 'c', notifId: 'C', notifyAt: new Date('2000-01-03').toJSON() },
          ],
        },
        set({ habitId: 'b', notifId: 'B', notifyAt: new Date('2000-01-04').toJSON() }),
      ),
    ).toEqual({
      notifications: [
        { habitId: 'a', notifId: 'A', notifyAt: new Date('2000-01-01').toJSON() },
        { habitId: 'b', notifId: 'B', notifyAt: new Date('2000-01-04').toJSON() },
        { habitId: 'c', notifId: 'C', notifyAt: new Date('2000-01-03').toJSON() },
      ],
    });
  });
  it('removes notification', () => {
    expect(
      reducer(
        {
          notifications: [
            { habitId: 'a' },
            { habitId: 'b' },
            { habitId: 'c' },
            { habitId: 'a' },
            { habitId: 'b' },
            { habitId: 'c' },
          ],
        },
        remove('b'),
      ),
    ).toEqual({
      notifications: [{ habitId: 'a' }, { habitId: 'c' }, { habitId: 'a' }, { habitId: 'c' }],
    });
  });
});
