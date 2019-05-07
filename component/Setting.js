import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Left, List, ListItem, Right, Separator, Text,
} from 'native-base';

const Setting = ({ setGoal }) => (
  <List>
    <Separator bordered />
    <ListItem onPress={setGoal}>
      <Left>
        <Text>目標設定</Text>
      </Left>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
    <Separator bordered />
  </List>
);

Setting.propTypes = {
  setGoal: PropTypes.func.isRequired,
};

export default Setting;
