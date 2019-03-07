import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Habit from '../component/Habit';
import {
  remove as removeAction,
  toggleEditable as toggleEditableAction,
  toggleEnable as toggleEnableAction,
} from '../redux/habit';

class HabitApp extends React.Component {
  componentDidMount() {
    const { navigation, toggleEditable } = this.props;
    navigation.addListener('didBlur', () => {
      const { editable } = this.props;
      if (editable) {
        toggleEditable();
      }
    });
  }

  render() {
    const {
      habits, editable, remove, toggleEnable, navigation,
    } = this.props;
    return (
      <Habit
        habits={habits}
        editable={editable}
        remove={remove}
        pressItem={(habitId) => {
          navigation.navigate(editable ? 'HabitUpdate' : 'HabitDetail', { habitId });
        }}
        toggleEnable={habitId => toggleEnable(habitId)}
      />
    );
  }
}

const mapStateToProps = state => ({
  habits: state.habit.habits,
  editable: state.habit.editable,
});

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(removeAction(id)),
  toggleEditable: () => dispatch(toggleEditableAction()),
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
  toggleEditable: PropTypes.func.isRequired,
  toggleEnable: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HabitApp);
