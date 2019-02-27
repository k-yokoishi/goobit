import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Home from '../component/Home';
import { toggleDone as toggleDoneAction } from '../redux/habit';

const HomeApp = ({
  goal, habits, achievement, toggleDone,
}) => {
  const weekdayNum = moment().weekday();
  const today = moment();
  return (
    <Home
      goal={goal}
      habits={habits
        .filter(habit => habit.repetition[weekdayNum])
        .map(habit => ({
          id: habit.id,
          habit: habit.habit,
          amount: habit.amount,
          unit: habit.unit,
          enabled: habit.enabled,
          done: !!achievement.find(a => a.id === habit.id && moment(a.date).isSame(today, 'day')),
        }))}
      check={habit => toggleDone(habit)}
    />
  );
};

HomeApp.propTypes = {
  goal: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string.isRequired,
      repetition: PropTypes.objectOf(PropTypes.bool).isRequired,
    }),
  ).isRequired,
  achievement: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  toggleDone: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  goal: state.goal,
  habits: state.habit.habits,
  achievement: state.habit.achievement,
});

const mapDispatchToProps = dispatch => ({
  toggleDone: (habit) => {
    dispatch(toggleDoneAction(habit));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeApp);
