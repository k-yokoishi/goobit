import React from 'react';

// to change locale in momentJS in React Native
// https://github.com/moment/moment/issues/4422
// https://github.com/moment/moment/issues/1875#issuecomment-421613092
import moment from 'moment';
import 'moment/locale/ja';

import { Button, Text } from 'native-base';
import { ScrollView, StyleSheet, View } from 'react-native';

interface Props {
  selectedDay: string;
  onSelectDay: (jsonDate: string) => void;
}

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

class HorizontalCalender extends React.Component<Props> {
  static defaultProps = {
    selectedDay: new Date().toJSON(),
  };

  scrollViewRef = React.createRef<ScrollView>();

  constructor(props: Props) {
    super(props);
    moment.locale('ja');
  }

  render() {
    const { selectedDay, onSelectDay } = this.props;
    const weekDays = moment.weekdaysShort();
    return (
      <View style={styles.wrapScrollView}>
        <ScrollView
          horizontal
          ref={this.scrollViewRef}
          onContentSizeChange={() => this.scrollViewRef.current!.scrollToEnd({ animated: false })}
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

export default HorizontalCalender;
