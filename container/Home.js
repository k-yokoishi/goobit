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
  const date = moment().format('YYYY-MM-DD');
  return (
    <Home
      goal={goal}
      habits={habits
        .filter(habit => habit.repetition[weekdayNum])
        .map(habit => ({
          id: habit.id,
          habit: habit.habit,
          amount: habit.amount,
          done: !!(achievement[date] && achievement[date][habit.id]),
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
  achievement: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    ),
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
