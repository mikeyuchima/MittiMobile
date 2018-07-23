import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// module actions
import { getLastSession } from '../../modules/auth/authActions';
import { changeScene } from '../../modules/navigation/navigationActions';

// components
import Splash from './components/Splash';

// constants
import { SPLASH_WAIT } from '../../constants/constants';

// other
import SCENES from '../../scenes';

class SplashContainer extends Component {
    static propTypes = {
        // module actions
        getLastSession: PropTypes.func.isRequired,
        changeScene: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getLastSession().then(token => {
            if (token) {
                setTimeout(() => {
                    this.props.changeScene(SCENES.home.key);
                }, SPLASH_WAIT);
            } else {
                setTimeout(() => {
                    this.props.changeScene(SCENES.login.key);
                }, SPLASH_WAIT);
            }
        });
    }

    render() {
        return <Splash />;
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {
        // module actions
        getLastSession,
        changeScene,
    }
)(SplashContainer);
