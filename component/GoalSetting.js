import React from 'react';
import {
  Button, Container, Content, Form, Input, Item, Label, Text,
} from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: '#D32E5E',
    margin: 16,
  },
});

const GoalSetting = () => (
  <Container>
    <Content>
      <Form>
        <Item floatingLabel>
          <Label>目標</Label>
          <Input />
        </Item>
      </Form>
    </Content>
    <Button block style={styles.createButton}>
      <Text>目標の設定</Text>
    </Button>
  </Container>
);

export default GoalSetting;
