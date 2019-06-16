import React from 'react';
import { Button, Icon, StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenProps,
  NavigationScreenProp,
  NavigationRoute,
} from 'react-navigation';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import GoalSettingApp from './container/GoalSetting';
import HabitApp from './container/Habit';
import HabitSettingApp from './container/HabitSetting';
import HabitUpdateApp from './container/HabitUpdate';
import HabitDetailApp from './container/HabitDetail';
import HomeApp from './container/Home';
import SettingApp from './container/Setting';
import configureStore from './redux/configureStore';

const { store, persistor } = configureStore();

const getTabBarIcon = (
  navigation: NavigationScreenProp<NavigationRoute>,
  tintColor: string | null,
) => {
  const { routeName } = navigation.state;
  let iconName = '';
  if (routeName === 'Home') {
    iconName = 'home';
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
    navigationOptions: ({ navigation }: NavigationScreenProps<{}>) => ({
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('HabitSetting')}>
          <Icon name="add" style={{ color: 'black', fontSize: 32 }} />
        </Button>
      ),
    }),
  },
  HabitSetting: HabitSettingApp,
  HabitUpdate: HabitUpdateApp,
  HabitDetail: HabitDetailApp,
});

const SettingStack = createStackNavigator({
  Setting: SettingApp,
  GoalSetting: GoalSettingApp,
});

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeApp,
      navigationOptions: () => ({ title: 'ホーム' }),
    },
    Habit: {
      screen: HabitStack,
      navigationOptions: () => ({ title: '習慣' }),
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: () => ({ title: '設定' }),
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => getTabBarIcon(navigation, tintColor),
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
