import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationTransitionProps } from 'react-navigation';
import HabitComponent from '../component/Habit';
import { remove as removeAction } from '../redux/habit';
import { AppState } from '../redux/reducer';
import { IDHabit } from '../types/type';

interface Habit {
  id: string;
  habit: string;
  unit: string;
  amount: number;
}

interface Props extends NavigationTransitionProps {
  habits: IDHabit[];
  remove: (id: string) => void;
}

const HabitApp = ({ habits, remove, navigation }: Props) => (
  <HabitComponent
    habits={habits}
    remove={remove}
    edit={(habitId) => {
      navigation.navigate('HabitUpdate', { habitId });
    }}
    pressItem={(habitId) => {
      navigation.navigate('HabitDetail', { habitId });
    }}
  />
);

const mapStateToProps = (state: AppState) => ({
  habits: state.habit.habits,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  remove: (id: string) => dispatch(removeAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HabitApp);
