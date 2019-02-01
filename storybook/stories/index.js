import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View, Text } from "react-native";
import Home from "../../component/Home";

const style = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F5FCFF"
};

const CenteredView = ({ children }) => (
  <View style={style}>
    {children}
  </View>
);

storiesOf("CenteredView", module)
  .add("Home", () => (
    <Home
      goal="56キロになる"
      date={new Date().toDateString()}
      habits={[
        { id: "1b8rja", habit: "腹筋を100回やる", done: false },
        { id: "gz0bea", habit: "腹筋を100回やる", done: true },
        { id: "pob5kz", habit: "スクワットを100回やる", done: false }
      ]}
    />
  ))
  .add("Home without habit", () => <Home goal="56キロになる" habits={[]} />);
