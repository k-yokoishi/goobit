import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Home from '../component/Home';
import { toggleDone as toggleDoneAction, selectDay as selectDayAction } from '../redux/habit';

const HomeApp = ({
  goal, habits, achievement, selectedDay, selectDay, toggleDone, navigation,
}) => {
  const weekdayNum = moment(selectedDay).weekday();
  const selectedDate = moment(selectedDay);
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
          done: !!achievement.find(
            a => a.id === habit.id && moment(a.date).isSame(selectedDate, 'day'),
          ),
        }))}
      selectedDay={selectedDay}
      selectDay={selectDay}
      check={habit => toggleDone(habit)}
      addHabit={() => navigation.navigate('HabitSetting')}
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
  selectedDay: PropTypes.string.isRequired,
  toggleDone: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  goal: state.goal,
  habits: state.habit.habits,
  achievement: state.habit.achievement,
  selectedDay: state.habit.selectedDay,
});

const mapDispatchToProps = dispatch => ({
  toggleDone: (habit) => {
    dispatch(toggleDoneAction(habit));
  },
  selectDay: (day) => {
    dispatch(selectDayAction(day));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeApp);
