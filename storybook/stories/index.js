/* eslint-disable import/no-extraneous-dependencies, no-console */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react-native';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-ondevice-notes';
import { StyleProvider } from 'native-base';
import Home from '../../component/Home';
import GoalSetting from '../../component/GoalSetting';
import Habit from '../../component/Habit';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

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
        check={console.log}
      />
    ),
    { notes: 'Initial page' },
  )
  .add('without habit', () => <Home goal={{ text: text('Goal 1', '56キロになる') }} habits={[]} />);

const goalSettingStories = storiesOf('Goal Setting', module);
goalSettingStories.add('Goal Setting', () => <GoalSetting />);

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
        check={console.log}
      />
    ),
    { notes: 'Initial page' },
  )
  .add('without habit', () => <Habit habits={[]} />);
