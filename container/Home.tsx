import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationTransitionProps } from 'react-navigation';
import Home from '../component/Home';
import { toggleDone as toggleDoneAction, selectDay as selectDayAction } from '../redux/habit';
import { AppState } from '../redux/reducer';

interface Habit {
  id: string;
  habit: string;
  repetition: { [weekDayNum: string]: boolean };
  amount: number;
  unit: string;
  remindAt: string | null;
  done: boolean;
  date: string;
}

interface Achievement {
  id: string;
  habit: string;
  repetition: { [weekDayNum: string]: boolean };
  amount: number;
  unit: string;
  remindAt: string | null;
  done: boolean;
  date: string;
}

type Props = {
  goal: { text: string };
  habits: Habit[];
  achievement: Achievement[];
  selectedDay: string;
  selectDay: (jsonDate: string) => void;
  toggleDone: (habit: Habit) => void;
} & NavigationTransitionProps;

const HomeApp = ({
  goal,
  habits,
  achievement,
  selectedDay,
  selectDay,
  toggleDone,
  navigation,
}: Props) => {
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
          repetition: habit.repetition,
          amount: habit.amount,
          unit: habit.unit,
          remindAt: habit.remindAt,
          done: !!achievement.find(
            a => a.id === habit.id && moment(a.date).isSame(selectedDate, 'day'),
          ),
          date: habit.date,
        }))}
      selectedDay={selectedDay}
      selectDay={selectDay}
      check={habit => toggleDone(habit)}
      addHabit={() => navigation.navigate('HabitSetting')}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  goal: state.goal,
  habits: state.habit.habits,
  achievement: state.habit.achievement,
  selectedDay: state.habit.selectedDay,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDone: (habit: Habit) => {
    dispatch(toggleDoneAction(habit));
  },
  selectDay: (day: string) => {
    dispatch(selectDayAction(day));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeApp);
