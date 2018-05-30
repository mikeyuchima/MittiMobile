import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components 
import {
  View,
  Text,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
// actions

// styles
import mittiStyles from '../../styles/mitti'; 
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

import {t} from '../../i18n';
import dictionary from './dictionary';

class TimestampContainer extends Component {
  static propTypes = {
    // states
    timestamp: PropTypes.string.isRequired,
    // actions
  };

  render(){
    return (
      <View>
        <Text style={mittiStyles.darkFontStrong}>
          {this.props.timestamp}
        </Text>
      </View>
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
)(TimestampContainer);
