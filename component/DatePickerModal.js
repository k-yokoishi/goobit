import React from 'react';
import {
  Button, Form, Text, View,
} from 'native-base';
import PropTypes from 'prop-types';
import { DatePickerIOS } from 'react-native';
import Modal from 'react-native-modal';

const DatePickerModal = ({
  isVisible,
  locale,
  mode,
  date,
  minimumDate,
  onBackdropPress,
  onDateChange,
  onDecide,
}) => (
  <View>
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Form style={{ backgroundColor: 'white', borderRadius: 15 }}>
        <DatePickerIOS
          locale={locale}
          date={date}
          minimumDate={minimumDate}
          mode={mode}
          onDateChange={onDateChange}
        />
        <Button onPress={onDecide} style={{ margin: 10, marginLeft: 'auto', marginRight: 'auto' }}>
          <Text>決定</Text>
        </Button>
      </Form>
    </Modal>
  </View>
);

DatePickerModal.propTypes = {
  isVisible: PropTypes.bool,
  locale: PropTypes.string,
  mode: PropTypes.oneOf(['date', 'time', 'datetime']),
  date: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
  onBackdropPress: PropTypes.func,
  onDateChange: PropTypes.func,
  onDecide: PropTypes.func,
};

DatePickerModal.defaultProps = {
  isVisible: false,
  locale: 'en',
  mode: 'date',
  date: null,
  minimumDate: null,
  onBackdropPress: null,
  onDateChange: null,
  onDecide: null,
};

export default DatePickerModal;
