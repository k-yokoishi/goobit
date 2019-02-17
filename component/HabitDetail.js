import React from 'react';
import PropTypes from 'prop-types';
import { Container, H1 } from 'native-base';
import { StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: 8,
  },
});
const HabitDetail = ({ habit, achievements }) => {
  const markedStyle = {
    customStyles: {
      container: { backgroundColor: '#D32E5E' },
      text: { color: 'white', fontWeight: 'bold' },
    },
  };
  const markedDates = achievements.reduce(
    (p, n) => ({ [moment(n.date).format('YYYY-MM-DD')]: markedStyle, ...p }),
    {},
  );
  return (
    <Container>
      <H1 style={styles.title}>{habit.habit}</H1>
      <CalendarList horizontal pagingEnabled markingType="custom" markedDates={markedDates} />
    </Container>
  );
};

HabitDetail.propTypes = {
  habit: PropTypes.shape({
    habit: PropTypes.string.isRequired,
  }).isRequired,
  achievements: PropTypes.arrayOf(
    PropTypes.shape({ date: PropTypes.string.isRequired, amount: PropTypes.number.isRequired }),
  ).isRequired,
};

export default HabitDetail;
