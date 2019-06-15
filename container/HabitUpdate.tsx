import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationTransitionProps } from 'react-navigation';
import HabitSetting from '../component/HabitSetting';
import { update } from '../redux/habit';
import { AppState } from '../redux/reducer';

interface Habit {
  habit: string;
  repetition: { [weekDayNum: string]: boolean };
  amount: number | null;
  unit: string;
  remindAt: string | null;
  id: string;
}

type Props = {
  habits: Habit[];
  updateHabit: (habit: Habit) => void;
} & NavigationTransitionProps;

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
      amount={amount ? amount.toString() : null}
      unit={unit}
      reminder={!!remindAt}
      remindAt={remindAt ? new Date(remindAt) : new Date()}
      createHabit={h => updateHabit(Object.assign(h, { id }))}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  habits: state.habit.habits,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props) => ({
  updateHabit: (habit: Habit) => {
    dispatch(update(habit));
    ownProps.navigation.navigate('Habit');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HabitUpdate);
