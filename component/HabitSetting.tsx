import React from 'react';
import {
  Button, Container, Form, Text, View, Label, Item, Input, Switch,
} from 'native-base';
import { DatePickerIOS, ScrollView, StyleSheet } from 'react-native';
// to change locale in momentJS in React Native
// https://github.com/moment/moment/issues/4422
// https://github.com/moment/moment/issues/1875#issuecomment-421613092
import moment from 'moment';
import 'moment/locale/ja';

import uuidv4 from 'uuid/v4';

import { Habit, IDHabit } from '../types/type';

interface HabitProp extends Habit {
  reminder: boolean;
}

interface Props extends HabitProp {
  createHabit: (habit: IDHabit) => void;
}

type State = HabitProp;

const styles = StyleSheet.create({
  weekdayButton: {
    margin: 4,
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  createButton: {
    margin: 16,
  },
});

class HabitSetting extends React.Component<Props, State> {
  static defaultProps: HabitProp = {
    habit: '',
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
    unit: '',
    reminder: false,
    remindAt: new Date().toJSON(),
  };

  constructor(props: Props) {
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

  handleToggleRepetition(weekdayNum: number) {
    const { repetition } = this.state;
    const updatedRepetition = Object.assign({}, repetition, {
      [weekdayNum]: !repetition[weekdayNum.toString()],
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
      amount: amount ? Number(amount) : null,
      unit,
      remindAt:
        reminder && remindAt
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
      <ScrollView>
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
                      style={[
                        styles.weekdayButton,
                        repetition[index.toString()] ? {} : { backgroundColor: 'lightgray' },
                      ]}
                      onPress={() => this.handleToggleRepetition(index)}
                    >
                      <Text style={{ paddingLeft: 12 } /* to center multi byte char */}>
                        {weekday}
                      </Text>
                    </Button>
                  );
                })}
              </View>
            </Item>
            <Item inlineLabel error={amount !== null && !Number(amount)}>
              <Label>量</Label>
              <Input
                value={amount ? amount.toString() : undefined}
                keyboardType="numeric"
                onChangeText={v => this.setState({ amount: Number(v) })}
              />
            </Item>
            <Item inlineLabel disabled={!amount}>
              <Label>単位</Label>
              <Input
                value={unit}
                disabled={!amount}
                onChangeText={v => this.setState({ unit: v })}
              />
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
                {reminder && remindAt && (
                  <DatePickerIOS
                    mode="time"
                    date={new Date(remindAt)}
                    locale="ja"
                    minuteInterval={10}
                    onDateChange={date => this.setState({ remindAt: date.toJSON() })}
                  />
                )}
              </View>
            </Item>
            <Button
              block
              disabled={!habit || (amount !== null && !Number(amount))}
              onPress={() => this.handleCreateHabit()}
              style={styles.createButton}
            >
              <Text>習慣の設定</Text>
            </Button>
          </Form>
        </Container>
      </ScrollView>
    );
  }
}

export default HabitSetting;
