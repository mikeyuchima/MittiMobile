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
                        <Text style={styles.title}>{t(dictionary.privacyPolicy)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0001)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0002)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0003)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0004)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.informationCollection)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0005)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0006)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0007)}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => this._openGooglePlay()}
                        style={styles.paragraph}
                    >
                        <Text style={styles.link}>Google Play Services</Text>
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.logData)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0008)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.cookies)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0009)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0010)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.serviceProviders)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0011)}</Text>
                    </View>

                    <View style={styles.listItem}>
                        <Text>{t(dictionary.policyContent0012)}</Text>
                    </View>

                    <View style={styles.listItem}>
                        <Text>{t(dictionary.policyContent0013)}</Text>
                    </View>

                    <View style={styles.listItem}>
                        <Text>{t(dictionary.policyContent0014)}</Text>
                    </View>

                    <View style={styles.listItem}>
                        <Text>{t(dictionary.policyContent0015)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0016)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.security)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0017)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.linksOtherSites)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0018)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.childrensPrivacy)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0019)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.policyChanges)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0020)}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.label}>{t(dictionary.contactUs)}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text>{t(dictionary.policyContent0021)}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this._openMailApp()} style={styles.paragraph}>
                        <Text style={styles.link}>info@digitaldip.ca</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    _openGooglePlay = () => {
        Linking.openURL('https://policies.google.com/privacy');
    };

    _openMailApp = () => {
        Linking.openURL('mailto:info@digitaldip.ca?subject=&body=');
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
    listItem: {
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 30,
        paddingRight: 20,
    },
    link: {
        color: colors.BLUE,
    },
});
