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
        // states

        // actions
        toggleDrawer: PropTypes.func.isRequired,
    };

    render() {
        const { toggleDrawer } = this.props;
        return (
            <TouchableOpacity style={{ padding: 8 }} onPress={toggleDrawer}>
                <Icon name="navicon" size={font.SIZE_H1} color={colors.WHITE} />
            </TouchableOpacity>
        );
    }
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
