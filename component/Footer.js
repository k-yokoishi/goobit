import React from "react";
import { Text } from "react-native";
import { Button, Footer, FooterTab, Icon } from "native-base";

export default class AppFooter extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical>
            <Icon name="trophy" />
            <Text>目標</Text>
          </Button>
          <Button vertical>
            <Icon name="calendar" />
            <Text>習慣</Text>
          </Button>
          <Button vertical>
            <Icon name="settings" />
            <Text>設定</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
