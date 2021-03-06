import React from 'react';
import {
  Body,
  Button,
  CheckBox,
  Container,
  Header,
  H1,
  H3,
  ListItem,
  Right,
  Text,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { AdMobBanner } from 'expo';
import HorizontalCalender from './HorizontalCalender';
import SunBed from '../assets/sunbed.svg';
import { IDHabit, Achievement } from '../types/type';

interface Habit extends IDHabit {
  done: boolean;
}

interface Props {
  goal: { text: string };
  habits: Habit[];
  selectedDay: string;
  check: (habit: Achievement) => void;
  addHabit: () => void;
  selectDay: (jsonDate: string) => void;
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: 8,
  },
  banner: {
    marginTop: 'auto',
  },
  message: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  image: {
    margin: 24,
  },
  addHabitButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const Home = ({
  goal, habits, check, selectedDay, addHabit, selectDay,
}: Props) => {
  const renderHabits = () => {
    if (habits.length) {
      return (
        <View>
          {habits.map((h) => {
            const {
              id, habit, done, amount, unit,
            } = h;
            return (
              <ListItem key={id}>
                <CheckBox
                  checked={done}
                  onPress={() => check({
                    id,
                    habit,
                    amount,
                    unit,
                    date: selectedDay,
                  })
                  }
                  color="#D32E5E"
                />
                <Body>
                  <Text>{habit}</Text>
                </Body>
                {amount && (
                  <Right>
                    <Text>{`${amount}${unit || ''}`}</Text>
                  </Right>
                )}
              </ListItem>
            );
          })}
        </View>
      );
    }
    return (
      <View style={styles.message}>
        <H3>実行する習慣はありません</H3>
        <SvgUri width="180" height="180" source={SunBed} style={styles.image} />
        <Button small rounded style={styles.addHabitButton} onPress={addHabit}>
          <Text>新しい習慣を作成する</Text>
        </Button>
      </View>
    );
  };

  return (
    <Container>
      <Header />
      {!!goal.text && <H1 style={styles.title}>{goal.text}</H1>}
      <HorizontalCalender selectedDay={selectedDay} onSelectDay={selectDay} />
      {renderHabits()}
      <View style={styles.banner}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7679937651802474/9146136515"
          testDeviceID="EMULATOR"
        />
      </View>
    </Container>
  );
};

export default Home;
