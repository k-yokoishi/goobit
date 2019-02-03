import React from "react";
import { Body, CheckBox, Container, H1, H2, List, ListItem, Text } from "native-base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    margin: 8
  }
});
export default class Home extends React.Component {
  render() {
    const { goals, habits, check } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Text style={styles.titleDate}>{}</Text>
        {goals.map(goal => <H1 style={styles.title}>{goal}</H1>)}
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
  }
}
