import React from 'react';
import { Container, Content, H1 } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { CalendarList, DateObject } from 'react-native-calendars';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import { Achievement, Habit } from '../types/type';

interface Props {
  habit: Habit | undefined;
  achievements: Achievement[];
}

interface State {
  visibleYear: number;
  visibleMonth: number;
}

const styles = StyleSheet.create({
  title: { textAlign: 'center' },
});

class HabitDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const now = moment();
    this.state = { visibleYear: now.year(), visibleMonth: now.month() + 1 };
  }

  weeksOfMonth() {
    const { visibleYear, visibleMonth } = this.state;
    const weekOfStart = moment()
      .year(visibleYear)
      .month(visibleMonth - 1)
      .startOf('month')
      .week();
    const weekOfend = moment()
      .year(visibleYear)
      .month(visibleMonth - 1)
      .endOf('month')
      .week();
    return [...Array(weekOfend - weekOfStart + 1).keys()].map(x => moment().week(x + weekOfStart));
  }

  handleVisibleMonthsChange(months: DateObject[]) {
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

    const { visibleYear, visibleMonth } = this.state;
    const amountEachWeek = this.weeksOfMonth().map(week => ({
      week: week.week(),
      amount:
        achievements
          .filter(a => moment(a.date).year() === visibleYear)
          .filter(a => moment(a.date).month() + 1 === visibleMonth)
          .filter(a => week.isSame(moment(a.date), 'week'))
          .reduce((x, y) => x + y.amount, 0) || 0,
    }));

    return (
      <Container>
        <Content>
          {habit && <H1 style={styles.title}>{habit.habit}</H1>}
          <CalendarList
            horizontal
            pagingEnabled
            showWeekNumbers
            markingType="custom"
            markedDates={markedDates}
            onVisibleMonthsChange={months => this.handleVisibleMonthsChange(months)}
          />
          <BarChart
            data={{
              labels: amountEachWeek.map(a => `w${a.week}`),
              datasets: [
                {
                  data: amountEachWeek.map(a => a.amount),
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
        </Content>
      </Container>
    );
  }
}

export default HabitDetail;
