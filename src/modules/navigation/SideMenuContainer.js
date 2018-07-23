import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import SideMenu from './components/SideMenu';

// actions
import { openDrawer, closeDrawer, changeScene } from './navigationActions';

// other module actions
import { logout } from '../auth/authActions';

class SideMenuContainer extends Component {
    static propTypes = {
        // states
        me: PropTypes.object,

        // actions
        openDrawer: PropTypes.func.isRequired,
        closeDrawer: PropTypes.func.isRequired,
        changeScene: PropTypes.func.isRequired,
        scene: PropTypes.object.isRequired,

        // other module actions
        logout: PropTypes.func.isRequired,
    };

    render() {
        const me = this.props.me;

        return (
            <SideMenu
                me={me}
                sceneKey={'??????????'}
                changeScene={this.props.changeScene}
                logout={this.props.logout}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        // states
        me: state.me.me,
    };
}

export default connect(
    mapStateToProps,
    {
        // actions
        openDrawer,
        closeDrawer,
        changeScene,

        // other module actions
        logout,
    }
)(SideMenuContainer);
