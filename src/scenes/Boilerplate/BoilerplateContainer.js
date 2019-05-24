import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components
import Boilerplate from './components/Boilerplate';
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';

// actions
import {changeFormValue} from './boilerplateActions';

// module actions
import {boilerplate} from '../../modules/auth/authActions';

// styles

// i18n
import {t} from '../../i18n';
import dictionary from './dictionary';

class BoilerplateContainer extends Component {
  static propTypes = {
  };

  render() {
    return <Boilerplate {...this.props} />
  }

  static renderNavigationBar = (props) => {
    return (
      <NavBar
        title={t(dictionary.boilerplate)}
        leftButton={<BackButtonContainer />} />
    );
  };
}

function mapStateToProps(state) {
  return {
    // states
    ...state.boilerplateScene,

    // module states
    isLoggingIn: state.auth.isLoggingIn,
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(BoilerplateContainer);
