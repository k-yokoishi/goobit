import React from 'react';
import {
  Button, Container, DatePicker, Form, Text, View, Label, Item, Input,
} from 'native-base';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

// to change locale in momentJS in React Native
// https://github.com/moment/moment/issues/4422
import moment from 'moment/min/moment-with-locales';

const styles = StyleSheet.create({
  weekdayButton: {
    margin: 4,
    borderRadius: 10,
  },
  unselectedWeekdayButton: {
    margin: 4,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
  createButton: {
    margin: 16,
  },
});

class HabitSetting extends React.Component {
  constructor() {
    super();
    this.weekdayKeys = moment.weekdaysShort(); // ["Sun", "Mon", ...]
    this.state = {
      habit: null,
      repetition: this.weekdayKeys.reduce(
        (prev, next) => Object.assign(prev, { [next]: false }),
        {},
      ),
      amount: null,
      unit: null,
      begin: null,
      end: null,
    };
    moment.locale('ja');
  }

  handleToggleRepetition(weekdayKey) {
    const { repetition } = this.state;
    const updatedRepetition = Object.assign({}, repetition, {
      [weekdayKey]: !repetition[weekdayKey],
    });
    this.setState({ repetition: updatedRepetition });
  }

  handleCreateHabit() {
    const { createHabit } = this.props;
    const {
      habit, repetition, amount, unit, begin, end,
    } = this.state;
    createHabit({
      habit,
      repetition,
      amount,
      unit,
      begin: begin.toJSON(),
      end: end.toJSON(),
    });
  }

  render() {
    return (
      <Container>
        <Form>
          <Item inlineLabel>
            <Label>習慣</Label>
            <Input onChangeText={habit => this.setState({ habit })} />
          </Item>
          <Label style={{ color: 'gray', margin: 12 }}>繰り返し</Label>
          <View style={{ flexDirection: 'row' }}>
            {moment.weekdaysShort().map((weekday, index) => {
              const weekdayKey = this.weekdayKeys[index];
              const { repetition } = this.state;
              return (
                <Button
                  key={weekdayKey}
                  style={
                    repetition[weekdayKey] ? styles.weekdayButton : styles.unselectedWeekdayButton
                  }
                  onPress={() => this.handleToggleRepetition(weekdayKey)}
                >
                  <Text>{weekday}</Text>
                </Button>
              );
            })}
          </View>
          <Item inlineLabel>
            <Label>量</Label>
            <Input keyboardType="numeric" onChangeText={amount => this.setState({ amount })} />
          </Item>
          <Item inlineLabel>
            <Label>単位</Label>
            <Input onChangeText={unit => this.setState({ unit })} />
          </Item>
          <Item inlineLabel>
            <Label>開始日</Label>
            <DatePicker
              locale="ja"
              animationType="none"
              androidMode="default"
              placeHolderText="yyyy/mm/dd"
              placeHolderTextStyle={{ color: '#d3d3d3' }}
              onDateChange={begin => this.setState({ begin })}
              supported
            />
          </Item>
          <Item inlineLabel>
            <Label>終了日</Label>
            <DatePicker
              locale="ja"
              animationType="none"
              androidMode="default"
              placeHolderText="yyyy/mm/dd"
              placeHolderTextStyle={{ color: '#d3d3d3' }}
              onDateChange={end => this.setState({ end })}
              supported
            />
          </Item>
          <Button block onPress={() => this.handleCreateHabit()} style={styles.createButton}>
            <Text>習慣の作成</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

HabitSetting.propTypes = {
  createHabit: PropTypes.func.isRequired,
};

export default HabitSetting;
