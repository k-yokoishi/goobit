import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationTransitionProps } from 'react-navigation';
import HabitSetting from '../component/HabitSetting';
import { add } from '../redux/habit';

interface Habit {
  habit: string;
  repetition: { [weekDayNum: string]: boolean };
  amount: number | null;
  unit: string;
  remindAt: string | null;
  id: string;
}
type Props = {
  createHabit: (habit: Habit) => void;
} & NavigationTransitionProps;

const HabitSettingApp = ({ createHabit }: Props) => <HabitSetting createHabit={createHabit} />;

HabitSettingApp.propTypes = {
  createHabit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props) => ({
  createHabit: (habit: Habit) => {
    dispatch(add(habit));
    ownProps.navigation.navigate('Habit');
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(HabitSettingApp);
