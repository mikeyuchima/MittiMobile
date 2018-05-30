import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// components 
import OpenDrawerButtonContainer from '../../modules/navigation/OpenDrawerButtonContainer';
import NavBackButton from '../../components/NavBackButton';

// actions
import {
  closeAnswerList,
} from './communityActions.js';

class LeftButtonContainer extends Component {
  static propTypes = {
    isAnswerListOpen: PropTypes.bool.isRequired,
    closeAnswerList: PropTypes.func.isRequired,
  };

  render(){
    if(this.props.isAnswerListOpen) {
      return (
        <NavBackButton back={this.props.closeAnswerList} />
      );
    }
    else {
      return <OpenDrawerButtonContainer />;
    }
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.communityScene,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    closeAnswerList,
  }
)(LeftButtonContainer);
