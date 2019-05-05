import React from 'react';
import PropTypes from 'prop-types';

// to change locale in momentJS in React Native
// https://github.com/moment/moment/issues/4422
import moment from 'moment/min/moment-with-locales';

import { Button, Text } from 'native-base';
import { ScrollView, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  dayButton: {
    margin: 4,
    flexDirection: 'column',
    alignItems: 'center',
    width: 48,
  },
  wrapScrollView: {
    height: 64,
  },
  weekdayText: {
    fontSize: 12,
  },
});

class HorizontalCalender extends React.Component {
  constructor(props) {
    super(props);
    moment.locale('ja');
    this.scrollViewRef = React.createRef();
  }

  render() {
    const { selectedDay, onSelectDay } = this.props;
    const weekDays = moment.weekdaysShort();
    return (
      <View style={styles.wrapScrollView}>
        <ScrollView
          horizontal
          ref={this.scrollViewRef}
          onContentSizeChange={() => this.scrollViewRef.current.scrollToEnd({ animated: false })}
        >
          {[...new Array(28).keys()].reverse().map((i) => {
            const day = moment().add(-i, 'day');
            const isSelected = moment(selectedDay).isSame(day, 'day');
            return (
              <Button
                key={i}
                style={styles.dayButton}
                light={!isSelected}
                onPress={() => onSelectDay(day.toJSON())}
              >
                <Text style={styles.weekdayText}>{weekDays[day.weekday()]}</Text>
                <Text>{day.format('DD')}</Text>
              </Button>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

HorizontalCalender.propTypes = {
  selectedDay: PropTypes.string,
  onSelectDay: PropTypes.func.isRequired,
};

HorizontalCalender.defaultProps = {
  selectedDay: new Date().toJSON(),
};

export default HorizontalCalender;
