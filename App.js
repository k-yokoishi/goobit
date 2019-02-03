import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Icon } from 'native-base';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import GoalSetting from './component/GoalSetting';
import Habit from './component/Habit';
import Home from './component/Home';
import Setting from './component/Setting';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
  let iconName = '';
  if (routeName === 'Home') {
    iconName = 'home';
  } else if (routeName === 'Goal') {
    iconName = 'trophy';
  } else if (routeName === 'Habit') {
    iconName = 'calendar';
  } else if (routeName === 'Setting') {
    iconName = 'settings';
  }
  return <Icon name={iconName} style={{ color: tintColor }} />;
};

// eslint-disable-next-line no-unused-vars
const RootStack = createBottomTabNavigator(
  {
    Home: { screen: withScreen(Home) },
    Goal: { screen: withScreen(GoalSetting) },
    Habit: { screen: withScreen(Habit) },
    Setting: { screen: withScreen(Setting) },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: '#D32E5E',
      inactiveTintColor: 'gray',
    },
  },
);

// Comment in here to check storybook
import storybook from './storybook'; 
export default storybook;

// Comment out here to check storybook
// export default createAppContainer(RootStack);
