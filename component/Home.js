import React from 'react';
import PropTypes from 'prop-types';
import {
  Body, CheckBox, Container, H1, H2, List, ListItem, Text,
} from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: 8,
  },
});

const Home = ({ goal, habits, check }) => (
  <Container>
    {goal && <H1 style={styles.title}>{goal.text}</H1>}
    <List>
      <ListItem itemHeader first>
        <H2 style={styles.listTitle}>今日やること</H2>
      </ListItem>
      {habits.map(habit => (
        <ListItem key={habit.id}>
          <CheckBox
            checked={habit.done}
            color="#D32E5E"
            onPress={() => check(habit.id, habit.done)}
          />
          <Body>
            <Text>{habit.habit}</Text>
          </Body>
        </ListItem>
      ))}
    </List>
  </Container>
);

Home.propTypes = {
  goal: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  check: PropTypes.func.isRequired,
};

Home.defaultProps = {
  goal: null,
};

export default Home;
