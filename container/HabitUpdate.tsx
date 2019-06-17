import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationTransitionProps } from 'react-navigation';
import HabitSetting from '../component/HabitSetting';
import { update } from '../redux/habit';
import { AppState } from '../redux/reducer';
import { IDHabit } from '../types/type';

interface Props extends NavigationTransitionProps {
  habits: IDHabit[];
  updateHabit: (habit: IDHabit) => void;
}

const HabitUpdate = ({ habits, updateHabit, navigation }: Props) => {
  const habitId = navigation.getParam('habitId');
  const targetHabit = habits.find(h => h.id === habitId);

  const {
    id, habit, repetition, amount, unit, remindAt,
  } = targetHabit!;
  return (
    <HabitSetting
      habit={habit}
      repetition={repetition}
      amount={amount !== null ? amount : null}
      unit={unit}
      reminder={!!remindAt}
      remindAt={remindAt ? new Date(remindAt).toJSON() : new Date().toJSON()}
      createHabit={h => updateHabit(Object.assign(h, { id }))}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  habits: state.habit.habits,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props) => ({
  updateHabit: (habit: IDHabit) => {
    dispatch(update(habit));
    ownProps.navigation.navigate('Habit');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HabitUpdate);
