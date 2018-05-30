import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import Policy from './components/Policy';
import { SpinnerOverlay } from '../../components';
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';

// module actions
import { updateMySettings } from '../../modules/me/meActions';
import { logout } from '../../modules/auth/authActions';

// styles
import commonStyles from '../../styles/common';

// i18n
import { t } from '../../i18n';
import dictionary from './dictionary';

class PrivacyPolicyContainer extends Component {
    static propTypes = {
        // module states
        settings: PropTypes.object.isRequired,
        isUpdatingMySettings: PropTypes.bool.isRequired,

        // module actions
        updateMySettings: PropTypes.func.isRequired,
    };

    static renderNavigationBar = props => {
        return <NavBar title={t(dictionary.privacyPolicy)} leftButton={<BackButtonContainer />} />;
    };

    render() {
        return <Policy {...this.props} />;
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
    logout,
})(PrivacyPolicyContainer);
