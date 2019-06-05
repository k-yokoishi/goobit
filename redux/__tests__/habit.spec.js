import {
  initialState,
  initialize,
  add,
  update,
  remove,
  toggleDone,
  selectDay,
  reducer,
} from '../habit';

describe('reducer', () => {
  it('initializes state', () => {
    expect(reducer({}, initialize())).toEqual(initialState);
  });
  it('adds habit', () => {
    expect(reducer({ habits: [] }, add({ id: 'a' }))).toEqual({ habits: [{ id: 'a' }] });
  });
  it('updates habit', () => {
    expect(
      reducer(
        {
          habits: [{ id: 'a', habit: 'foo' }, { id: 'b', habit: 'bar' }, { id: 'c', habit: 'baz' }],
        },
        update({ id: 'b', habit: 'qux' }),
      ),
    ).toEqual({
      habits: [{ id: 'a', habit: 'foo' }, { id: 'b', habit: 'qux' }, { id: 'c', habit: 'baz' }],
    });
  });
  it('removes habit and achievement by habit id', () => {
    expect(
      reducer(
        {
          habits: [{ id: 'a', habit: 'foo' }, { id: 'b', habit: 'bar' }, { id: 'c', habit: 'baz' }],
          achievement: [
            { id: 'a', habit: 'foo' },
            { id: 'b', habit: 'bar' },
            { id: 'b', habit: 'bar' },
          ],
        },
        remove('b'),
      ),
    ).toEqual({
      habits: [{ id: 'a', habit: 'foo' }, { id: 'c', habit: 'baz' }],
      achievement: [{ id: 'a', habit: 'foo' }],
    });
  });
  it('adds achievement', () => {
    expect(
      reducer(
        {
          selectedDay: new Date('2000-01-04').toJSON(),
          achievement: [
            { id: 'a', date: new Date('2000-01-01').toJSON() },
            { id: 'a', date: new Date('2000-01-02').toJSON() },
            { id: 'a', date: new Date('2000-01-03').toJSON() },
          ],
        },
        toggleDone({ id: 'a' }),
      ),
    ).toEqual({
      selectedDay: new Date('2000-01-04').toJSON(),
      achievement: [
        { id: 'a', date: new Date('2000-01-01').toJSON() },
        { id: 'a', date: new Date('2000-01-02').toJSON() },
        { id: 'a', date: new Date('2000-01-03').toJSON() },
        { id: 'a', date: new Date('2000-01-04').toJSON() },
      ],
    });
  });
  it('removes achievement', () => {
    expect(
      reducer(
        {
          selectedDay: new Date('2000-01-02').toJSON(),
          achievement: [
            { id: 'a', date: new Date('2000-01-01').toJSON() },
            { id: 'a', date: new Date('2000-01-02').toJSON() },
            { id: 'a', date: new Date('2000-01-03').toJSON() },
          ],
        },
        toggleDone({ id: 'a' }),
      ),
    ).toEqual({
      selectedDay: new Date('2000-01-02').toJSON(),
      achievement: [
        { id: 'a', date: new Date('2000-01-01').toJSON() },
        { id: 'a', date: new Date('2000-01-03').toJSON() },
      ],
    });
  });
  it('updates selected', () => {
    expect(
      reducer(
        { selectedDay: new Date('2000-01-01').toJSON() },
        selectDay(new Date('2000-01-02').toJSON()),
      ),
    ).toEqual({ selectedDay: new Date('2000-01-02').toJSON() });
  });
});
