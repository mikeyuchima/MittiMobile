import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// modules
import NavBar from '../../modules/navigation/components/NavBar';
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';

import {t} from '../../i18n';
import dictionary from './dictionary';
import {POST_TYPES} from '../../constants/constants';

class NavBarContainer extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    navKey: PropTypes.string.isRequired,
  };

  render() {
    const {item, navKey} = this.props;
    const postType = item && item.type;
    let translation = '';
    let title = '';

    // check if we hvae post type
    if(postType) {
      // check market type
      switch(postType) {
        case POST_TYPES.free.id: {
          translation = t(dictionary.freeShare);
          break;
        }
        default: {
          translation = t(dictionary[postType]);
        }
      }
      // get title
      title = (postType && translation) || '';
    }

    return (
      <NavBar
        title={title}
        leftButton={<BackButtonContainer navKey={navKey} />} 
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.chatScene,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
  }
)(NavBarContainer);