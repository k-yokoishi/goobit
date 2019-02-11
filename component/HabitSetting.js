import React from 'react';
import {
  Button, Container, Form, Text, View, Label, Item, Input,
} from 'native-base';
import PropTypes from 'prop-types';
import { StyleSheet, DatePickerIOS } from 'react-native';
import Modal from 'react-native-modal';

// to change locale in momentJS in React Native
// https://github.com/moment/moment/issues/4422
import moment from 'moment/min/moment-with-locales';

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
      begin: new Date(),
      end: new Date(),
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
      habit, repetition, amount, unit, begin, end,
    } = this.state;
    createHabit({
      habit,
      repetition,
      amount,
      unit,
      begin: begin ? begin.toJSON() : null,
      end: end ? end.toJSON() : null,
    });
  }

  renderModal() {
    const { openedModal, begin, end } = this.state;
    return (
      <View>
        <Modal
          isVisible={!!openedModal}
          onBackdropPress={() => this.setState({ openedModal: null })}
        >
          <Form style={{ backgroundColor: 'white', borderRadius: 15 }}>
            <DatePickerIOS
              locale="ja"
              date={openedModal === 'begin' ? begin : end}
              mode="date"
              onDateChange={date => this.setState({ [openedModal]: date })}
            />
            <Button
              onPress={() => this.setState({ openedModal: null })}
              style={{ margin: 10, marginLeft: 'auto', marginRight: 'auto' }}
            >
              <Text>決定</Text>
            </Button>
          </Form>
        </Modal>
      </View>
    );
  }

  render() {
    const { begin, end } = this.state;
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
            <Text onPress={() => this.setState({ openedModal: 'begin' })}>
              {begin ? moment(begin).format('YYYY/MM/DD') : 'null'}
            </Text>
          </Item>
          <Item inlineLabel>
            <Label>終了日</Label>
            <Text onPress={() => this.setState({ openedModal: 'end' })}>
              {end ? moment(end).format('YYYY/MM/DD') : 'null'}
            </Text>
          </Item>
          <Button block onPress={() => this.handleCreateHabit()} style={styles.createButton}>
            <Text>習慣の作成</Text>
          </Button>
        </Form>
        {this.renderModal()}
      </Container>
    );
  }
}

HabitSetting.propTypes = {
  createHabit: PropTypes.func.isRequired,
};

export default HabitSetting;
