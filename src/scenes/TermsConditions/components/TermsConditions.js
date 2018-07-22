import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import {
    StyleSheet,
    View,
    ScrollView,
    Picker,
    Switch,
    Button,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { SpinnerOverlay } from '../../../components';
import FAIcon from 'react-native-vector-icons/FontAwesome';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// constants
import { LOCALES } from '../../../constants/constants';

export default class Profile extends Component {
    render() {
        return (
            <ScrollView
                style={[
                    commonStyles.fullScreen, 
                    styles.container]}>
            
                <View style={mittiStyles.bottomScrollExtra}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{t(dictionary.termsConditions)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0001)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0002)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0003)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0004)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0005)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0006)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0007)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0008)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.termsChanges)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0009)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.contactUs)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.termsContent0010)}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this._openMailApp()} style={styles.paragraph}>
                        <Text style={styles.link}>info@digitaldip.ca</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    _openMailApp = () => {
        Linking.openURL('mailto:info@digitaldip.ca&subject=&body=');
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        paddingBottom: 10,
    },
    titleContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        marginTop: 20,
        fontSize: font.SIZE_MENU_ICON,
        color: '#000',
        marginBottom: 20,
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    label: {
        fontSize: font.SIZE_H2,
        color: '#000',
    },
    paragraph: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    link: {
        color: colors.BLUE,
    },
});
