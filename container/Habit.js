import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Habit from '../component/Habit';
import { remove as removeAction } from '../redux/habit';

const HabitApp = ({
  habits, editable, remove, navigation,
}) => (
  <Habit
    habits={habits}
    editable={editable}
    remove={remove}
    edit={(habitId) => {
      navigation.navigate('HabitUpdate', { habitId });
    }}
    pressItem={(habitId) => {
      navigation.navigate('HabitDetail', { habitId });
    }}
  />
);

const mapStateToProps = state => ({
  habits: state.habit.habits,
  editable: state.habit.editable,
});

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(removeAction(id)),
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HabitApp);
