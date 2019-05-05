import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, H3, Left, List, ListItem, Right, Text, View,
} from 'native-base';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Swipeable from 'react-native-swipeable';
import Desk from '../assets/desk.svg';

const styles = StyleSheet.create({
  listItem: {
    height: 48,
  },
  rightSwipeItem: {
    height: 48,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
  image: {
    marginTop: 24,
    marginBottom: 24,
  },
});

const Habit = ({
  habits, remove, edit, pressItem,
}) => {
  const handleEdit = (habitId) => {
    edit(habitId);
  };
  const handleRemove = (habitId) => {
    Alert.alert('習慣を削除します', '一度削除した習慣は元に戻せませんがよろしいですか？', [
      { text: 'キャンセル', style: 'cancel' },
      { text: '削除', onPress: () => remove(habitId) },
    ]);
  };

  return (
    <Container>
      {habits.length > 0 ? (
        <View>
          <List>
            {habits.map(habit => (
              <Swipeable
                rightButtons={[
                  <TouchableOpacity
                    style={[styles.rightSwipeItem, { backgroundColor: '#5cb85c' }]}
                    onPress={() => handleEdit(habit.id)}
                  >
                    <Text style={styles.buttonText}>編集</Text>
                  </TouchableOpacity>,
                  <TouchableOpacity
                    style={[styles.rightSwipeItem, { backgroundColor: '#d9534f' }]}
                    onPress={() => handleRemove(habit.id)}
                  >
                    <Text style={styles.buttonText}>削除</Text>
                  </TouchableOpacity>,
                ]}
                key={habit.id}
              >
                <ListItem
                  key={habit.id}
                  onPress={() => pressItem(habit.id)}
                  style={styles.listItem}
                >
                  <Left>
                    <Text>{habit.habit}</Text>
                  </Left>
                  {!!habit.amount && (
                    <Right>
                      <Text>
                        {habit.amount}
                        {!!habit.unit && ` ${habit.unit}`}
                      </Text>
                    </Right>
                  )}
                </ListItem>
              </Swipeable>
            ))}
          </List>
        </View>
      ) : (
        <View style={styles.message}>
          <H3>習慣が設定されていません</H3>
          <Text style={styles.hint}>「＋」をタップして習慣を作成しましょう。</Text>
          <SvgUri width="180" height="180" source={Desk} style={styles.image} />
        </View>
      )}
    </Container>
  );
};

Habit.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string.isRequired,
    }),
  ).isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  pressItem: PropTypes.func.isRequired,
};

export default Habit;
