import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, Container, Icon, StyleProvider, Text,
} from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import GoalSettingApp from './container/GoalSetting';
import HabitApp from './container/Habit';
import HabitSettingApp from './container/HabitSetting';
import HabitUpdateApp from './container/HabitUpdate';
import HabitDetailApp from './container/HabitDetail';
import HomeApp from './container/Home';
import Setting from './component/Setting';
import { toggleEditable } from './redux/habit';
import configureStore from './redux/configureStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
  },
  headerButton: {
    marginLeft: 16,
    marginRight: 16,
  },
});

export const withScreen = WrappedComponent => () => (
  <Container style={styles.container}>
    <WrappedComponent />
  </Container>
);

const { store, persistor } = configureStore();

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
  return <Icon testID={routeName.toLowerCase()} name={iconName} style={{ color: tintColor }} />;
};

const HabitStack = createStackNavigator({
  Habit: {
    screen: HabitApp,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Button transparent hasText onPress={() => store.dispatch(toggleEditable())}>
          <Text style={{ color: 'black' }}>編集</Text>
        </Button>
      ),
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('HabitSetting')}>
          <Icon name="add" style={{ color: 'black', fontSize: 24 }} />
        </Button>
      ),
    }),
  },
  HabitSetting: HabitSettingApp,
  HabitUpdate: HabitUpdateApp,
  HabitDetail: HabitDetailApp,
});

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeApp,
      navigationOptions: () => ({ title: 'ホーム' }),
    },
    Goal: {
      screen: createStackNavigator({ GoalSettingApp }),
      navigationOptions: () => ({ title: '目標' }),
    },
    Habit: {
      screen: HabitStack,
      navigationOptions: () => ({ title: '習慣' }),
    },
    Setting: {
      screen: withScreen(Setting),
      navigationOptions: () => ({ title: '設定' }),
    },
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

const AppContainer = createAppContainer(RootStack);
// persistor.purge(); // remove comment to clear store

const App = () => (
  <StyleProvider style={getTheme(commonColor)}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  </StyleProvider>
);
export default App;
