import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import GoalSetting, { Props } from '../component/GoalSetting';
import { update } from '../redux/goal';
import { AppState } from '../redux/reducer';

const GoalSettingApp = ({ goal, set }: Props) => <GoalSetting goal={goal} set={set} />;

GoalSettingApp.propTypes = {
  goal: PropTypes.string.isRequired,
  set: PropTypes.func.isRequired,
};

const mapStateToProps = (state: AppState) => ({
  goal: state.goal.text,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  set: (goal: string) => {
    dispatch(update({ text: goal }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoalSettingApp);
