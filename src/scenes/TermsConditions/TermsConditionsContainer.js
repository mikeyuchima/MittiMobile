import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import TermsConditions from './components/TermsConditions';
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

class TermsConditionsContainer extends Component {
    static propTypes = {
        // module states
        settings: PropTypes.object.isRequired,
        isUpdatingMySettings: PropTypes.bool.isRequired,

        // module actions
        updateMySettings: PropTypes.func.isRequired,
    };
    
    // static renderNavi
    static navigationOptions = ({ navigation }) => {
        const navKey = navigation.state.key;

        return {
            headerTitle: (
                <NavBar
                    title={t(dictionary.termsConditions)}
                    leftButton={<BackButtonContainer navKey={navKey} />}
                />
            ),
            headerLeft: null
        };
    };

    render() {
        return <TermsConditions {...this.props} />;
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
})(TermsConditionsContainer);
