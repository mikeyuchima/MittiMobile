import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components
import Drawer from 'react-native-drawer';
import SideMenu from './components/SideMenu';

// actions
import {openDrawer, closeDrawer, changeScene} from './navigationActions';

// other module actions
import {logout} from '../auth/authActions';

class NavigationDrawerContainer extends Component {
  static propTypes = {
    // states
    me: PropTypes.object,
    isDrawerOpen: PropTypes.bool.isRequired,

    // actions
    openDrawer: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
    scene: PropTypes.object.isRequired,

    // other module actions
    logout: PropTypes.func.isRequired,
  };

  render(){
    const me = this.props.me;

    return (
      <Drawer
        ref="navigation"
        open={this.props.isDrawerOpen}
        onClose={this.props.closeDrawer}
        type="displace"
        content={
          <SideMenu
            me={me}
            sceneKey={this.props.scene.sceneKey}
            changeScene={this.props.changeScene}
            logout={this.props.logout} />
        }
        tapToClose={true}
        openDrawerOffset={(viewport) => viewport.width - 300}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
          mainOverlay: {
            opacity: Math.max(0.6, 1-ratio),
            backgroundColor: ratio ? 'black' : 'transparent'
          },
        })}>
        {this.props.children}
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  const {isDrawerOpen, scene} = state.navigation;
  return {
    // states
    me: state.me.me,
    scene,
    isDrawerOpen,
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
)(NavigationDrawerContainer);
