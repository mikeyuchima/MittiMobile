import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// components
import ForgotPassword from './components/ForgotPassword';
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';

// actions
import {changeFormValue} from './forgotPasswordActions';

// module actions
import {resetPassword} from '../../modules/auth/authActions';
import {changeScene} from '../../modules/navigation/navigationActions.js';

// styles

// i18n
import {t} from '../../i18n';
import dictionary from './dictionary';

class ForgotPasswordContainer extends Component {
  static propTypes = {
    // states
    form: PropTypes.shape({
      username: PropTypes.string
    }),

    // module states
    isResetting: PropTypes.bool.isRequired,

    // actions
    changeFormValue: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,

    // module actions
    changeScene: PropTypes.func.isRequired,
  };

  render() {
    return <ForgotPassword {...this.props} />
  }

  static renderNavigationBar = (props) => {
    return (
      <NavBar
        title={t(dictionary.forgotPassword)}
        leftButton={<BackButtonContainer />} />
    );
  };
}

function mapStateToProps(state) {
  return {
    // states
    ...state.forgotPasswordScene,

    // module states
    isResetting: false
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    changeFormValue,

    // module actions
    resetPassword,
    changeScene,
  }
)(ForgotPasswordContainer);
