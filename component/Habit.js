import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Container, Icon, List, ListItem, Text,
} from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  addButton: {
    borderRadius: 35,
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 16,
    marginBottom: 16,
  },
});

const Habit = ({ habits, add }) => (
  <Container>
    {habits.length > 0 ? (
      <List>
        {habits.map(habit => (
          <ListItem key={habit.id}>
            <Text>{habit.habit}</Text>
          </ListItem>
        ))}
      </List>
    ) : (
      <Text>習慣が設定されていません</Text>
    )}
    <Button style={styles.addButton} onPress={() => add()}>
      <Icon name="add" />
    </Button>
  </Container>
);

Habit.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string.isRequired,
    }),
  ).isRequired,
  add: PropTypes.func.isRequired,
};

export default Habit;
