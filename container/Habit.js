import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Habit from '../component/Habit';
import { remove as removeAction, toggleEnable as toggleEnableAction } from '../redux/habit';

const HabitApp = ({
  habits, editable, remove, toggleEnable, navigation,
}) => (
  <Habit
    habits={habits}
    editable={editable}
    remove={remove}
    pressItem={(habitId) => {
      navigation.navigate('HabitDetail', { habitId });
    }}
    toggleEnable={habitId => toggleEnable(habitId)}
  />
);

const mapStateToProps = state => ({
  habits: state.habit.habits,
  editable: state.habit.editable,
});

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(removeAction(id)),
  toggleEnable: id => dispatch(toggleEnableAction(id)),
});

HabitApp.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string.isRequired,
    }),
  ).isRequired,
  editable: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  toggleEnable: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HabitApp);
