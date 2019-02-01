import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Icon } from "native-base";
import Goal from "./component/Goal";
import Habit from "./component/Habit";
import Home from "./component/Home";
import Setting from "./component/Setting";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";

const withScreen = WrappedComponent => class extends React.Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <WrappedComponent />
        </View>
      </Container>
    );
  }
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  var iconName = "";
  if (routeName === "Home") {
    iconName = "home";
  } else if (routeName === "Goal") {
    iconName = "trophy";
  } else if (routeName === "Habit") {
    iconName = "calendar";
  } else if (routeName === "Setting") {
    iconName = "settings";
  }
  return <Icon name={iconName} style={{ color: tintColor }} />;
};
const RootStack = createBottomTabNavigator(
  {
    Home: { screen: withScreen(Home) },
    Goal: { screen: withScreen(Goal) },
    Habit: { screen: withScreen(Habit) },
    Setting: { screen: withScreen(Setting) }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: "#D32E5E",
      inactiveTintColor: "gray"
    }
  }
);

const AppContainer = createAppContainer(RootStack);

// Comment in here to check storybook
export default from "./storybook";

// Comment out here to check storybook
// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
