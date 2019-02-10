import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react-native';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-ondevice-notes';
import { StyleProvider } from 'native-base';
import Home from '../../component/Home';
import GoalSetting from '../../component/GoalSetting';
import Habit from '../../component/Habit';
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
    'with habits',
    () => (
      <Home
        goal={{ text: text('Goal 1', '56キロになる') }}
        habits={[
          { id: '1b8rja', habit: '腹筋を100回やる', done: boolean('habit1', false) },
          { id: 'gz0bea', habit: '腹筋を100回やる', done: boolean('habit2', true) },
          { id: 'pob5kz', habit: 'スクワットを100回やる', done: boolean('habit3', false) },
        ]}
        check={action('check')}
      />
    ),
    { notes: 'Initial page' },
  )
  .add('without habit', () => <Home goal={{ text: text('Goal 1', '56キロになる') }} habits={[]} />);

const goalSettingStories = storiesOf('Goal Setting', module);
goalSettingStories.add('Goal Setting', () => <GoalSetting set={action('set')} />);

const habitStories = storiesOf('Habit', module);
habitStories.addDecorator(withKnobs);
habitStories
  .add(
    'with habits',
    () => (
      <Habit
        habits={[
          { id: '1b8rja', habit: '腹筋を100回やる' },
          { id: 'gz0bea', habit: '腹筋を100回やる' },
          { id: 'pob5kz', habit: 'スクワットを100回やる' },
        ]}
        check={action('check')}
      />
    ),
    { notes: 'Initial page' },
  )
  .add('does not have habit', () => <Habit habits={[]} />);

const habitSettings = storiesOf('Habit Settings', module);
habitSettings.add('Initial page', () => <HabitSettings createHabit={action('createHabit')} />, {
  notes: 'Initial page',
});
