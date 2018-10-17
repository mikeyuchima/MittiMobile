import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { toggleDrawer } from './navigationActions';

// components
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// styles
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

class OpenDrawerButtonContainer extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        toggleDrawer: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TouchableOpacity style={{ padding: 8 }} onPress={this._toggleDrawer}>
                <Icon name="navicon" size={font.SIZE_H1} color={colors.WHITE} />
            </TouchableOpacity>
        );
    }

    _toggleDrawer = () => {
        const { toggleDrawer, navigation } = this.props;

        toggleDrawer(navigation);
    };
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {
        // actions
        toggleDrawer,
    }
)(OpenDrawerButtonContainer);
