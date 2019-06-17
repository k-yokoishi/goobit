import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationTransitionProps } from 'react-navigation';
import HabitSetting from '../component/HabitSetting';
import { add } from '../redux/habit';
import { IDHabit } from '../types/type';

type Props = {
  createHabit: (habit: IDHabit) => void;
} & NavigationTransitionProps;

const HabitSettingApp = ({ createHabit }: Props) => <HabitSetting createHabit={createHabit} />;

HabitSettingApp.propTypes = {
  createHabit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props) => ({
  createHabit: (habit: IDHabit) => {
    dispatch(add(habit));
    ownProps.navigation.navigate('Habit');
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(HabitSettingApp);
