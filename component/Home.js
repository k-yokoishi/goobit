import React from 'react';
import PropTypes from 'prop-types';
import {
  Body, Container, Header, H1, H2, Icon, Left, ListItem, Right, Text,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-swipeable';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: 8,
  },
  subTitle: {
    margin: 8,
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
});

const Home = ({ goal, habits, check }) => (
  <Container>
    <Header />
    <H1 style={styles.title}>{goal.text || '目標が設定されていません'}</H1>
    <H2 style={styles.subTitle}>今日やること</H2>
    <View>
      {habits
        .filter(habit => habit.enabled)
        .map(habit => (
          <Swipeable
            key={habit.id}
            leftActionActivationDistance={80}
            onLeftActionActivate={() => check(habit)}
            leftContent={(
              <View
                style={[
                  styles.leftSwipeItem,
                  { backgroundColor: habit.done ? 'lightgray' : '#D32E5E' },
                ]}
              >
                <Icon
                  name={habit.done ? 'close' : 'checkmark'}
                  style={{ color: 'white', fontSize: 38 }}
                />
              </View>
)}
          >
            <ListItem icon>
              <Left>
                <Icon
                  name={habit.done ? 'checkmark-circle' : 'radio-button-off'}
                  style={{ color: '#D32E5E', marginRight: 3 }}
                />
              </Left>
              <Body>
                <Text>{habit.habit}</Text>
              </Body>
              <Right>
                <Text>{`${habit.amount}${habit.unit || ''}`}</Text>
              </Right>
            </ListItem>
          </Swipeable>
        ))}
    </View>
  </Container>
);

Home.propTypes = {
  goal: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      habit: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      unit: PropTypes.string,
      done: PropTypes.bool.isRequired,
      enabled: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  check: PropTypes.func.isRequired,
};

export default Home;
