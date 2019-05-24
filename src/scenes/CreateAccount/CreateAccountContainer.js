import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components
import CreateAccount from './components/CreateAccount';

// actions
import {changeFormValue} from './createAccountActions';

// module actions
import {register} from '../../modules/auth/authActions';
import {changeScene} from '../../modules/navigation/navigationActions.js';

class CreateAccountContainer extends Component {
  static propTypes = {
    // states
    form: PropTypes.shape({
      fullName: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
    }),

    // actions
    changeFormValue: PropTypes.func.isRequired,

    // module states
    isLoggingIn: PropTypes.bool.isRequired,
    
    // module actions
    register: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
  };

  render() {
    return <CreateAccount {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.createAccountScene,

    // module states
    isLoggingIn: state.auth.isLoggingIn,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    changeFormValue,

    // module actions
    register,
    changeScene,
  }
)(CreateAccountContainer);
