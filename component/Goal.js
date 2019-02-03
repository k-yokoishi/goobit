import React from "react";
import { Button, Container, Icon, Left, List, ListItem, Right, Text } from "native-base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: "#D32E5E",
    borderRadius: 30,
    marginTop: "auto",
    marginLeft: "auto",
    marginBottom: 16,
    marginRight: 16
  }
});

export default class GoalSetting extends React.Component {
  render() {
    const { goal } = this.props;
    return (
      <Container>
        <List>
          {goal
            ? <ListItem key={goal.id}>
                <Left>
                  <Text>
                    {goal.text}
                  </Text>
                </Left>
              </ListItem>
            : <Text>目標を設定しましょう</Text>}
        </List>
        <Button style={styles.createButton}>
          <Icon name="add" />
        </Button>
      </Container>
    );
  }
}
