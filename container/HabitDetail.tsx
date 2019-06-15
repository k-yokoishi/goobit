import React from 'react';
import { connect } from 'react-redux';
import { NavigationTransitionProps } from 'react-navigation';

import HabitDetail from '../component/HabitDetail';
import { Achievement, Habit } from '../types/type';
import { AppState } from '../redux/reducer';

interface Props {
  achievements: Achievement[];
  habits: Habit[];
}

const HabitDetailApp = ({
  achievements,
  habits,
  navigation,
}: Props & NavigationTransitionProps) => {
  const habitId = navigation.getParam('habitId');
  return (
    <HabitDetail
      habit={habits.find(habit => habit.id === habitId)}
      achievements={achievements.filter(a => a.id === habitId)}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  achievements: state.habit.achievement,
  habits: state.habit.habits,
});

export default connect(mapStateToProps)(HabitDetailApp);
