import React from 'react';
import {
  Button, Container, Content, Form, Input, Item, Label, Text,
} from 'native-base';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: '#D32E5E',
    margin: 16,
  },
});

class GoalSetting extends React.Component {
  constructor() {
    super();
    this.state = { goal: '' };
  }

  handleSet() {
    const { set } = this.props;
    const { goal } = this.state;
    set(goal);
  }

  render() {
    const { goal } = this.state;
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>目標</Label>
              <Input
                onChangeText={(val) => {
                  this.setState({ goal: val });
                }}
                value={goal}
              />
            </Item>
          </Form>
        </Content>
        <Button block style={styles.createButton} onPress={() => this.handleSet()}>
          <Text>目標の設定</Text>
        </Button>
      </Container>
    );
  }
}

GoalSetting.propTypes = {
  set: PropTypes.func.isRequired,
};

export default GoalSetting;
