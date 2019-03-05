import React from 'react';
import {
  Button, Container, Form, Text, View, Label, Item, Input, Switch,
} from 'native-base';
import PropTypes from 'prop-types';
import { DatePickerIOS, StyleSheet } from 'react-native';
// to change locale in momentJS in React Native
// https://github.com/moment/moment/issues/4422
import moment from 'moment/min/moment-with-locales';
import uuidv4 from 'uuid/v4';

const styles = StyleSheet.create({
  weekdayButton: {
    margin: 4,
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  unselectedWeekdayButton: {
    margin: 4,
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
  createButton: {
    margin: 16,
  },
});

class HabitSetting extends React.Component {
  constructor(props) {
    super(props);
    const {
      habit, repetition, amount, unit, reminder, remindAt,
    } = props;
    this.state = {
      habit,
      repetition,
      amount,
      unit,
      reminder,
      remindAt,
    };
    moment.locale('ja');
  }

  handleToggleRepetition(weekdayNum) {
    const { repetition } = this.state;
    const updatedRepetition = Object.assign({}, repetition, {
      [weekdayNum]: !repetition[weekdayNum],
    });
    this.setState({ repetition: updatedRepetition });
  }

  handleCreateHabit() {
    const { createHabit } = this.props;
    const {
      habit, repetition, amount, unit, reminder, remindAt,
    } = this.state;
    createHabit({
      habit,
      repetition,
      amount: Number(amount),
      unit,
      remindAt: reminder
        ? moment(remindAt)
          .seconds(0)
          .milliseconds(0)
          .toJSON()
        : null,
      id: uuidv4(),
    });
  }

  render() {
    const {
      habit, amount, unit, reminder, remindAt,
    } = this.state;
    return (
      <Container>
        <Form>
          <Item inlineLabel>
            <Label>習慣</Label>
            <Input value={habit} onChangeText={v => this.setState({ habit: v })} />
          </Item>
          <Item style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Label style={{ marginTop: 12 }}>繰り返し</Label>
            <View style={{ flexDirection: 'row' }}>
              {moment.weekdaysShort().map((weekday, index) => {
                const { repetition } = this.state;
                return (
                  <Button
                    key={weekday}
                    style={
                      repetition[index] ? styles.weekdayButton : styles.unselectedWeekdayButton
                    }
                    onPress={() => this.handleToggleRepetition(index)}
                  >
                    <Text>{weekday}</Text>
                  </Button>
                );
              })}
            </View>
          </Item>
          <Item inlineLabel>
            <Label>量</Label>
            <Input
              value={amount}
              keyboardType="numeric"
              onChangeText={v => this.setState({ amount: v })}
            />
          </Item>
          <Item inlineLabel>
            <Label>単位</Label>
            <Input value={unit} onChangeText={v => this.setState({ unit: v })} />
          </Item>
          <Item>
            <Label style={{ marginTop: 16, marginBottom: 'auto' }}>リマインダー</Label>
            <View
              style={{
                width: 200,
                marginTop: 16,
                marginBottom: 16,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Switch
                value={reminder}
                onValueChange={(value) => {
                  this.setState({ reminder: value });
                }}
                style={{ marginLeft: 'auto' }}
              />
              {reminder && (
                <DatePickerIOS
                  mode="time"
                  date={remindAt}
                  locale="ja"
                  onDateChange={date => this.setState({ remindAt: date })}
                />
              )}
            </View>
          </Item>
          <Button block onPress={() => this.handleCreateHabit()} style={styles.createButton}>
            <Text>習慣の作成</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

HabitSetting.defaultProps = {
  habit: null,
  repetition: {
    0: false, // sun
    1: false, // mon
    2: false, // tue
    3: false, // wed
    4: false, // thu
    5: false, // fri
    6: false, // sat
  },
  amount: null,
  unit: null,
  reminder: false,
  remindAt: new Date(),
};

HabitSetting.propTypes = {
  habit: PropTypes.string,
  repetition: PropTypes.objectOf(PropTypes.bool),
  amount: PropTypes.string,
  unit: PropTypes.string,
  reminder: PropTypes.bool,
  remindAt: PropTypes.instanceOf(Date),
  createHabit: PropTypes.func.isRequired,
};

export default HabitSetting;
