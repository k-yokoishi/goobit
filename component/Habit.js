import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, H3, Icon, Left, List, ListItem, Right, Switch, Text, View,
} from 'native-base';
import { Alert, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  removeIcon: {
    marginRight: 16,
    color: 'red',
    fontSize: 24,
  },
  listItem: {
    height: 48,
  },
  message: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  hint: {
    margin: 16,
    color: 'gray',
  },
});
const Habit = ({
  habits, editable, remove, pressItem, toggleEnable,
}) => (
  <Container>
    {habits.length > 0 ? (
      <List>
        {habits.map(habit => (
          <ListItem key={habit.id} onPress={() => pressItem(habit.id)} style={styles.listItem}>
            <Left>
              {editable && (
                <Icon
                  name="remove-circle"
                  onPress={() => {
                    Alert.alert(
                      '習慣を削除します',
                      '一度削除した習慣は元に戻せませんがよろしいですか？',
                      [
                        { text: 'キャンセル', style: 'cancel' },
                        { text: '削除', onPress: () => remove(habit.id) },
                      ],
                    );
                  }}
                  style={styles.removeIcon}
                />
              )}
              <Text>{habit.habit}</Text>
            </Left>
            <Right>
              {editable ? (
                <Icon name="arrow-forward" />
              ) : (
                <Switch value={habit.enabled} onValueChange={() => toggleEnable(habit.id)} />
              )}
            </Right>
          </ListItem>
        ))}
      </List>
    ) : (
      <View style={styles.message}>
        <H3>習慣が設定されていません</H3>
        <Text style={styles.hint}>「＋」をタップして習慣を作成しましょう。</Text>
      </View>
    )}
  </Container>
);

Habit.defaultProps = {
  editable: false,
};

Habit.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string.isRequired,
      enabled: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  editable: PropTypes.bool,
  remove: PropTypes.func.isRequired,
  pressItem: PropTypes.func.isRequired,
  toggleEnable: PropTypes.func.isRequired,
};

export default Habit;
