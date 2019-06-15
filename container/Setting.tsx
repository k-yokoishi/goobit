import React from 'react';
import PropTypes from 'prop-types';
import { NavigationTransitionProps } from 'react-navigation';
import Setting from '../component/Setting';

const SettingApp = ({ navigation }: NavigationTransitionProps) => (
  <Setting setGoal={() => navigation.navigate('GoalSetting')} />
);

SettingApp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SettingApp;
