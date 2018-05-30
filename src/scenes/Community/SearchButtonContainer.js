import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// components 
import {
  View,
  TouchableOpacity,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
// actions

// styles
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';
import mittiStyles from '../../styles/mitti';

import {t} from '../../i18n';
import dictionary from './dictionary';

class SearchButtonContainer extends Component {
  static propTypes = {
    // states

    // actions
  };

  render(){
    return (
      <TouchableOpacity style={mittiStyles.navbarButtonContainer}>
        <FAIcon 
          size={font.SIZE_H1} 
          color={colors.WHITE} 
          name={'search'} />
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return {
    // states
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
  }
)(SearchButtonContainer);
