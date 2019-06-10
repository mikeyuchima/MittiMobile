import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import SideMenu from "./components/SideMenu";

// actions
import { changeScene } from "./navigationActions";

// other module actions
import { logout } from "../auth/authActions";

class SideMenuContainer extends Component {
  static propTypes = {
    // states
    me: PropTypes.object,

    // actions
    changeScene: PropTypes.func.isRequired,

    // other module actions
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { me, changeScene, navigation, logout } = this.props;
    const sceneKey = navigation.getParam("sceneKey");
    return (
      <SideMenu
        me={me}
        sceneKey={sceneKey}
        changeScene={changeScene}
        logout={logout}
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
    changeScene,

    // other module actions
    logout,
  },
)(SideMenuContainer);
