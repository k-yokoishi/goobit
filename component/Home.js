import React from "react";
import { Body, CheckBox, Container, List, ListItem, Text } from "native-base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 32,
    margin: 16
  },
  titleDate: {
    fontSize: 16,
    margin: 16,
    textAlign: "center"
  },
  listTitle: {
    fontSize: 16
  }
});
export default class Home extends React.Component {
  render() {
    const { goal, date, habits, check } = this.props;
    const d = new Date(date);
    console.log(this.props);
    return (
      <Container>
        <Text style={styles.titleDate}>{`${d.getFullYear()}年${d.getMonth()}月の目標`}</Text>
        <Text style={styles.title}>{goal}</Text>
        <List>
          <ListItem itemHeader first>
            <Text style={styles.listTitle}>今日やること</Text>
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
  }
}
