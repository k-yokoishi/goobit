import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Habit from '../component/Habit';

const HabitApp = ({ habits, navigation }) => (
  <Habit
    habits={habits}
    add={() => {
      navigation.navigate('HabitSetting');
    }}
  />
);

const mapStateToProps = state => ({
  habits: state.habit.habits,
});

HabitApp.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string.isRequired,
    }),
  ).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(HabitApp);
