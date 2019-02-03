import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Icon } from 'native-base';
import { Provider } from 'react-redux'
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import GoalSettingApp from './container/GoalSetting';
import Habit from './component/Habit';
import HomeApp from './container/Home'
import Setting from './component/Setting';
import store from './redux/store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64
  },
});

const withScreen = WrappedComponent => class extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <WrappedComponent />
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

const RootStack = createBottomTabNavigator(
  {
    Home: { screen: withScreen(HomeApp) },
    Goal: { screen: withScreen(GoalSettingApp) },
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
// import storybook from './storybook'; 
// export default storybook;

// Comment out here to check storybook
const AppContainer = createAppContainer(RootStack);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)
export default App
