import React from 'react';
import {
  Container, Content, Form, Input, Item, Label,
} from 'native-base';
import PropTypes from 'prop-types';

export interface Props {
  goal: string;
  set: (text: string) => void;
}

const GoalSetting = ({ goal, set }: Props) => (
  <Container>
    <Content>
      <Form>
        <Item stackedLabel>
          <Label>ホーム画面に表示する目標を設定できます</Label>
          <Input
            testID="goalSetting"
            onChangeText={(val) => {
              set(val);
            }}
            value={goal}
          />
        </Item>
      </Form>
    </Content>
  </Container>
);

GoalSetting.propTypes = {
  goal: PropTypes.string.isRequired,
  set: PropTypes.func.isRequired,
};

export default GoalSetting;
