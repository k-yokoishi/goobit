import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HabitSetting from '../component/HabitSetting';
import { add } from '../redux/habit';

const HabitSettingApp = ({ createHabit }) => <HabitSetting createHabit={createHabit} />;

HabitSettingApp.propTypes = {
  createHabit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createHabit: (habit) => {
    dispatch(add(habit));
    ownProps.navigation.navigate('Habit');
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(HabitSettingApp);
