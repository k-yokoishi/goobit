import React from 'react';
import PropTypes from 'prop-types';
import {
  Body, CheckBox, Container, Header, H1, H2, ListItem, Right, Text,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import { AdMobBanner } from 'expo';

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
  banner: {
    marginTop: 'auto',
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
          <ListItem key={habit.id}>
            <CheckBox checked={habit.done} onPress={() => check(habit)} color="#D32E5E" />
            <Body>
              <Text>{habit.habit}</Text>
            </Body>
            <Right>
              <Text>{`${habit.amount}${habit.unit || ''}`}</Text>
            </Right>
          </ListItem>
        ))}
    </View>
    <View style={styles.banner}>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-7679937651802474/9146136515"
        testDeviceID="EMULATOR"
      />
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
