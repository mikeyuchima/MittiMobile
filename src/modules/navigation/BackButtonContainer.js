import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { back } from './navigationActions';

// components
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBackButton from '../../components/NavBackButton';

// styles
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

class BackButtonContainer extends Component {
    static propTypes = {
        // actions
        back: PropTypes.func.isRequired,
        navKey: PropTypes.string.isRequired,
    };

    render() {
        const { back, navKey } = this.props;

        return <NavBackButton back={back} navKey={navKey} />;
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {
        // actions
        back,
    }
)(BackButtonContainer);
