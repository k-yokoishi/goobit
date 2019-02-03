import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../component/Home';

const HomeApp = ({ goal }) => <Home goal={goal} habits={[]} check={() => {}} />;

HomeApp.propTypes = {
  goal: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  goal: state.goal,
});

export default connect(mapStateToProps)(HomeApp);
