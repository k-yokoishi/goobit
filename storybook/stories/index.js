/* eslint-disable import/no-extraneous-dependencies, no-console */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react-native';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-ondevice-notes';
import Home from '../../component/Home';
import GoalSetting from '../../component/GoalSetting';

addDecorator(withNotes);

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
