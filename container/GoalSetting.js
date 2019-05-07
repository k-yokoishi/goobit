import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoalSetting from '../component/GoalSetting';
import { update } from '../redux/goal';

const GoalSettingApp = ({ goal, set }) => <GoalSetting goal={goal} set={set} />;

GoalSettingApp.propTypes = {
  goal: PropTypes.string.isRequired,
  set: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  goal: state.goal.text,
});

const mapDispatchToProps = dispatch => ({
  set: (goal) => {
    dispatch(update({ text: goal }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoalSettingApp);
