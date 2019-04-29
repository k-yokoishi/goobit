import React from 'react';
import PropTypes from 'prop-types';
import { Container, H1 } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';

const styles = StyleSheet.create({
  title: { textAlign: 'center' },
});

class HabitDetail extends React.Component {
  static sortAchievementByDate(x, y) {
    return moment(x.date).utc() < moment(y.date).utc() ? -1 : 1;
  }

  constructor() {
    super();
    const now = moment();
    this.state = { visibleYear: now.year(), visibleMonth: now.month() + 1 };
  }

  filterAchievementByYearMonth(achievement) {
    const achieveDate = moment(achievement.date);
    const { visibleYear, visibleMonth } = this.state;
    return achieveDate.year() === visibleYear && achieveDate.month() + 1 === visibleMonth;
  }

  handleVisibleMonthsChange(months) {
    this.setState({ visibleYear: months[0].year, visibleMonth: months[0].month });
  }

  render() {
    const { habit, achievements } = this.props;
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

    const sortedAchievements = achievements
      .filter(achievement => this.filterAchievementByYearMonth(achievement))
      .sort(this.sortAchievementByDate);
    return (
      <Container>
        <H1 style={styles.title}>{habit.habit}</H1>
        <CalendarList
          horizontal
          pagingEnabled
          markingType="custom"
          markedDates={markedDates}
          onVisibleMonthsChange={months => this.handleVisibleMonthsChange(months)}
        />
        <BarChart
          data={{
            labels: sortedAchievements.map(a => moment(a.date).format('MM/DD')),
            datasets: [
              {
                data: sortedAchievements.map(a => a.amount),
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: (opacity = 1) => `rgba(211, 46, 94, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          yAxis={{ yAxis: { left: { axisMinimum: 0 } } }}
          fromZero
        />
      </Container>
    );
  }
}

HabitDetail.propTypes = {
  habit: PropTypes.shape({
    habit: PropTypes.string.isRequired,
  }).isRequired,
  achievements: PropTypes.arrayOf(
    PropTypes.shape({ date: PropTypes.string.isRequired, amount: PropTypes.number.isRequired }),
  ).isRequired,
};

export default HabitDetail;
