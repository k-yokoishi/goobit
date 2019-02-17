import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react-native';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-ondevice-notes';
import { StyleProvider } from 'native-base';
import moment from 'moment';
import Home from '../../component/Home';
import GoalSetting from '../../component/GoalSetting';
import Habit from '../../component/Habit';
import HabitDetail from '../../component/HabitDetail';
import HabitSettings from '../../component/HabitSetting';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

/* eslint-disable-next-line no-console */
const action = act => value => console.log(`${act}:`, value);

addDecorator(withNotes);
addDecorator(story => <StyleProvider style={getTheme(commonColor)}>{story()}</StyleProvider>);

const homeStories = storiesOf('Home', module);
homeStories.addDecorator(withKnobs);
homeStories
  .add(
    'Home w/ habits',
    () => (
      <Home
        goal={{ text: text('Goal 1', '56キロになる') }}
        habits={[
          { id: '1b8rja', habit: '腹筋を100回やる', done: boolean('habit1', false) },
          { id: 'gz0bea', habit: '背筋を100回やる', done: boolean('habit2', true) },
          { id: 'pob5kz', habit: 'スクワットを100回やる', done: boolean('habit3', false) },
        ]}
        check={action('check')}
      />
    ),
    { notes: 'Initial page' },
  )
  .add('Home w/o habit', () => (
    <Home goal={{ text: text('Goal 1', '56キロになる') }} habits={[]} />
  ));

const goalSettingStories = storiesOf('Goal Setting', module);
goalSettingStories.add('Goal Setting', () => <GoalSetting set={action('set')} />);

const habitStories = storiesOf('Habit', module);
habitStories.addDecorator(withKnobs);
habitStories
  .add(
    'Goal setting with habits',
    () => (
      <Habit
        habits={[
          { id: '1b8rja', habit: '腹筋を100回やる' },
          { id: 'gz0bea', habit: '腹筋を100回やる' },
          { id: 'pob5kz', habit: 'スクワットを100回やる' },
        ]}
        add={action('check')}
      />
    ),
    { notes: 'Goal setting initial page' },
  )
  .add('does not have habit', () => <Habit habits={[]} add={action('check')} />);

const habitDetail = storiesOf('Habit Detail', module);
habitDetail.add('Habit detail initial page', () => (
  <HabitDetail
    habit={{
      habit: '腹筋を100回やる',
    }}
    achievements={[
      { date: moment().toJSON(), amount: 100 },
      {
        date: moment()
          .day(1)
          .toJSON(),
        amount: 100,
      },
      {
        date: moment()
          .day(2)
          .toJSON(),
        amount: 50,
      },
      {
        date: moment()
          .day(7)
          .toJSON(),
        amount: 100,
      },
      {
        date: moment()
          .day(8)
          .toJSON(),
        amount: 100,
      },
      {
        date: moment()
          .day(9)
          .toJSON(),
        amount: 100,
      },
      {
        date: moment()
          .add(-1, 'month')
          .toJSON(),
        amount: 100,
      },
    ]}
  />
));

const habitSettings = storiesOf('Habit Settings', module);
habitSettings.add(
  'Habit setting initial page',
  () => <HabitSettings createHabit={action('createHabit')} />,
  {
    notes: 'HabitInitial page',
  },
);
