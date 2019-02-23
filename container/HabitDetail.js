import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HabitDetail from '../component/HabitDetail';

const HabitDetailApp = ({ achievements, habits, navigation }) => {
  const habitId = navigation.getParam('habitId');
  return (
    <HabitDetail habit={habits.find(habit => habit.id === habitId)} achievements={achievements} />
  );
};

const mapStateToProps = state => ({
  achievements: state.habit.achievement,
  habits: state.habit.habits,
});

HabitDetailApp.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      habit: PropTypes.string.isRequired,
    }),
  ).isRequired,
  achievements: PropTypes.arrayOf(
    PropTypes.shape({ date: PropTypes.string.isRequired, amount: PropTypes.number.isRequired }),
  ).isRequired,
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(HabitDetailApp);
