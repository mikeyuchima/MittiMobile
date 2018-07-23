import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Tour1 from './components/Tour1';
import Tour2 from './components/Tour2';
import Tour3 from './components/Tour3';
import { changePage } from './tourActions.js';
import { changeScene } from '../../modules/navigation/navigationActions.js';
import commonStyles from '../../styles/common';

import { t } from '../../i18n';
import dictionary from './dictionary';
import Swiper from 'react-native-swiper';

const Dot = () => <View style={styles.dot} />;

const ActiveDot = () => <View style={styles.activeDot} />;

class TourContainer extends Component {
    static propTypes = {
        page: PropTypes.number.isRequired,
        changePage: PropTypes.func.isRequired,
        changeScene: PropTypes.func.isRequired,
    };

    render() {
        const { page, changePage, changeScene } = this.props;

        return (
            <Swiper
                ref={swiper => {
                    this.swiper = swiper;
                }}
                showsButtons={false}
                loop={false}
                dot={<Dot />}
                activeDot={<ActiveDot />}
            >
                <Tour1 onPress={() => this.swiper.scrollBy(1, true)} />
                <Tour2 onPress={() => this.swiper.scrollBy(1, true)} />
                <Tour3 onPress={() => changeScene('home')} />
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    dot: {
        backgroundColor: 'rgba(255,255,255,.3)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: 'transparent',
        width: 10,
        height: 10,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        borderColor: 'rgba(255,255,255,.3)',
        borderWidth: 1,
    },
});

function mapStateToProps(state) {
    return {
        ...state.tourScene,
    };
}

export default connect(
    mapStateToProps,
    {
        changeScene,
        changePage,
    }
)(TourContainer);
