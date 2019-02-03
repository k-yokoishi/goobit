import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoalSetting from '../component/GoalSetting';
import { update } from '../redux/goal';

const GoalSettingApp = ({ set }) => <GoalSetting set={set} />;

GoalSettingApp.propTypes = {
  set: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  set: (goal) => {
    dispatch(update({ text: goal }));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(GoalSettingApp);
