import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HabitSetting from '../component/HabitSetting';
import { update } from '../redux/habit';

const HabitUpdate = ({ habits, updateHabit, navigation }) => {
  const habitId = navigation.getParam('habitId');
  const targetHabit = habits.find(h => h.id === habitId);
  const {
    id, habit, repetition, amount, unit, remindAt, enabled,
  } = targetHabit;
  return (
    <HabitSetting
      habit={habit}
      repetition={repetition}
      amount={amount.toString()}
      unit={unit}
      reminder={!!remindAt}
      remindAt={remindAt ? new Date(remindAt) : new Date()}
      createHabit={h => updateHabit(Object.assign(h, { id, enabled }))}
    />
  );
};

HabitUpdate.propTypes = {
  updateHabit: PropTypes.func.isRequired,
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string,
      repetition: PropTypes.objectOf(PropTypes.bool),
      amount: PropTypes.number,
      unit: PropTypes.string,
      remindAt: PropTypes.string,
      enabled: PropTypes.bool,
    }),
  ).isRequired,
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  habits: state.habit.habits,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateHabit: (habit) => {
    dispatch(update(habit));
    ownProps.navigation.navigate('Habit');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HabitUpdate);
