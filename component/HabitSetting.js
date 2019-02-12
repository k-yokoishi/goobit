import React from 'react';
import {
  Button, Container, Form, Text, View, Label, Item, Input,
} from 'native-base';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
// to change locale in momentJS in React Native
// https://github.com/moment/moment/issues/4422
import moment from 'moment/min/moment-with-locales';
import DatePickerModal from './DatePickerModal';

const weekdayButtonStyle = {
  margin: 4,
  height: 40,
  width: 40,
  borderRadius: 10,
};

const styles = StyleSheet.create({
  weekdayButton: weekdayButtonStyle,
  unselectedWeekdayButton: Object.assign({}, weekdayButtonStyle, {
    backgroundColor: 'lightgray',
  }),
  createButton: {
    margin: 16,
  },
  inputForm: {
    marginTop: 16,
    marginBottom: 16,
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
      reminder: null,
      openedModal: null,
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
      habit, repetition, amount, unit, begin, end, reminder,
    } = this.state;
    createHabit({
      habit,
      repetition,
      amount,
      unit,
      begin: begin ? begin.toJSON() : null,
      end: end ? end.toJSON() : null,
      reminder,
    });
  }

  render() {
    const {
      openedModal, begin, end, reminder,
    } = this.state;
    return (
      <Container>
        <Form>
          <Item inlineLabel>
            <Label>習慣</Label>
            <Input onChangeText={habit => this.setState({ habit })} />
          </Item>
          <Item style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Label style={{ marginTop: 12 }}>繰り返し</Label>
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
          </Item>
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
            <Text onPress={() => this.setState({ openedModal: 'begin' })} style={styles.inputForm}>
              {begin ? moment(begin).format('YYYY/MM/DD') : 'yyyy/mm/dd'}
            </Text>
          </Item>
          <Item inlineLabel>
            <Label>終了日</Label>
            <Text onPress={() => this.setState({ openedModal: 'end' })} style={styles.inputForm}>
              {end ? moment(end).format('YYYY/MM/DD') : 'yyyy/mm/dd'}
            </Text>
          </Item>
          <Item inlineLabel>
            <Label>リマインダー</Label>
            <Text
              onPress={() => this.setState({ openedModal: 'reminder' })}
              style={styles.inputForm}
            >
              {reminder ? moment(reminder).format('HH:mm') : 'hh:mm'}
            </Text>
          </Item>
          <Button block onPress={() => this.handleCreateHabit()} style={styles.createButton}>
            <Text>習慣の作成</Text>
          </Button>
        </Form>
        <DatePickerModal
          isVisible={!!openedModal}
          locale="ja"
          // eslint-disable-next-line react/destructuring-assignment
          date={this.state[openedModal] || new Date()}
          minimumDate={openedModal === 'reminder' ? null : new Date()}
          mode={openedModal === 'reminder' ? 'time' : 'date'}
          onBackdropPress={() => this.setState({ openedModal: null })}
          onDateChange={date => this.setState({ [openedModal]: date })}
          onDecide={() => this.setState({ openedModal: null })}
        />
      </Container>
    );
  }
}

HabitSetting.propTypes = {
  createHabit: PropTypes.func.isRequired,
};

export default HabitSetting;
