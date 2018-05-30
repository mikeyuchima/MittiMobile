import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import Settings from './components/Settings';
import { SpinnerOverlay } from '../../components';
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';

// module actions
import { updateMySettings } from '../../modules/me/meActions';
import { logout } from '../../modules/auth/authActions';
import { changeScene } from '../../modules/navigation/navigationActions.js';

// styles
import commonStyles from '../../styles/common';

// i18n
import { t } from '../../i18n';
import dictionary from './dictionary';

class SettingsContainer extends Component {
    static propTypes = {
        // module states
        settings: PropTypes.object.isRequired,
        isUpdatingMySettings: PropTypes.bool.isRequired,

        // module actions
        updateMySettings: PropTypes.func.isRequired,
        changeScene: PropTypes.func.isRequired,
    };

    static renderNavigationBar = props => {
        return <NavBar title={t(dictionary.settings)} leftButton={<BackButtonContainer />} />;
    };

    render() {
        return <Settings {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        // states
        settings: state.me.me.settings,

        // module states
        isUpdatingMySettings: state.me.isUpdatingMySettings,
    };
}

export default connect(mapStateToProps, {
    // module actions
    updateMySettings,
    changeScene,
    logout,
})(SettingsContainer);
