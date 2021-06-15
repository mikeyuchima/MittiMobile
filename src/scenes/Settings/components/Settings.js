import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import {
    StyleSheet,
    View,
    ScrollView,
    Picker,
    Switch,
    Text,
    TouchableOpacity,
    Linking,
    ActionSheetIOS,
    Button,
    Platform
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
    static propTypes = {
        // states
        settings: PropTypes.object.isRequired,

        // module states
        isUpdatingMySettings: PropTypes.bool.isRequired,

        // module actions
        updateMySettings: PropTypes.func.isRequired,
        changeScene: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    };

    render() {
        const { isUpdatingMySettings, updateMySettings, settings } = this.props;

        toggleActionSheetUnit = () => {
            // choice is either radius or unit
            ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: ['KM', 'Mile', 'Cancel'],
                //   destructiveButtonIndex: 1,
                  cancelButtonIndex: 2,
                },
                (buttonIndex) => {
                  const options = ['km', 'mile', 'Cancel']
                  const { updateMySettings } = this.props;
    
                  if (buttonIndex !== 2) {
                    updateMySettings({ radiusUnit: options[buttonIndex]});
                  }
                },
            );
        }

        toggleActionSheetRadius = () => {
            // choice is either radius or unit
            ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: ['10','20','30','40','50','Cancel'],
                //   destructiveButtonIndex: 1,
                  cancelButtonIndex: 5,
                },
                (buttonIndex) => {
                  const options = ['10','20','30','40','50','Cancel']
                  const { updateMySettings } = this.props;
    
                  if (buttonIndex !== 5) {
                    updateMySettings({ defaultRadius: options[buttonIndex]});
                  }
                },
            );
        }

        return (
            <ScrollView style={[commonStyles.fullScreen, styles.container]}>
                <View>
                    <SpinnerOverlay show={isUpdatingMySettings} />

                    <View style={styles.header}>
                        <Text style={styles.heading}>{t(dictionary.general)}</Text>
                    </View>

                    <View style={styles.field}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{t(dictionary.language)}</Text>
                        </View>
                        <View style={[styles.inputContainer, styles.inputContainerFixedWidth]}>
                            <Picker
                                style={styles.input}
                                selectedValue={settings.locale}
                                onValueChange={locale => updateMySettings({ locale })}
                            >
                                {Object.keys(LOCALES).map(key => (
                                    <Picker.Item
                                        key={key}
                                        label={LOCALES[key].label}
                                        value={LOCALES[key].value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{t(dictionary.measureDistanceBy)}</Text>
                        </View>
                        <View style={[styles.inputContainer, styles.inputContainerFixedWidth]}>
                            {Platform.OS === 'ios' ? 
                            <Button title={settings.radiusUnit.toString().toUpperCase()} onPress={toggleActionSheetUnit}/>
                            :
                            <Picker
                                style={styles.input}
                                selectedValue={settings.radiusUnit.toUpperCase()}
                                onValueChange={radiusUnit => updateMySettings({ radiusUnit })}
                            >
                                <Picker.Item key="km" label={t(dictionary.km)} value={'km'} />
                                <Picker.Item key="mile" label={t(dictionary.mile)} value={'mile'} />
                            </Picker>
                            }
                        </View>
                    </View>

                    <View style={styles.field}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{t(dictionary.showMeThingsWithin)}</Text>
                        </View>
                        <View style={[styles.inputContainer, styles.inputContainerFixedWidth]}>
                            {
                            Platform.OS === 'ios' ?
                            <Button title={settings.defaultRadius.toString()} onPress={toggleActionSheetRadius}/>
                            :
                            <Picker
                                style={styles.input}
                                selectedValue={settings.defaultRadius}
                                onValueChange={defaultRadius => updateMySettings({ defaultRadius })}
                            >
                                <Picker.Item
                                    label={'10' + settings.radiusUnit.toUpperCase()}
                                    value={10}
                                />
                                <Picker.Item
                                    label={'20' + settings.radiusUnit.toUpperCase()}
                                    value={20}
                                />
                                <Picker.Item
                                    label={'30' + settings.radiusUnit.toUpperCase()}
                                    value={30}
                                />
                                <Picker.Item
                                    label={'40' + settings.radiusUnit.toUpperCase()}
                                    value={40}
                                />
                                <Picker.Item
                                    label={'50' + settings.radiusUnit.toUpperCase()}
                                    value={50}
                                />
                            </Picker>
                            }
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.header}>
                        <Text style={styles.heading}>{t(dictionary.notifications)}</Text>
                    </View>

                    <View style={styles.field}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{t(dictionary.pushNotifications)}</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Switch
                                style={styles.input}
                                onValueChange={isNotificationOn =>
                                    updateMySettings({ isNotificationOn })
                                }
                                value={settings.isNotificationOn}
                            />
                        </View>
                    </View>

                    <View style={styles.field}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>
                                {t(dictionary.newMessageNotifications)}
                            </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Switch
                                style={styles.input}
                                onValueChange={isNewMessageNotificationOn =>
                                    updateMySettings({ isNewMessageNotificationOn })
                                }
                                value={settings.isNewMessageNotificationOn}
                            />
                        </View>
                    </View>

                    <View style={styles.field}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{t(dictionary.playSoundsWithinTheApp)}</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Switch
                                style={styles.input}
                                onValueChange={isPlaySound => updateMySettings({ isPlaySound })}
                                value={settings.isPlaySound}
                            />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        onPress={() => this.props.changeScene('privacyPolicy')}
                    >
                        <View style={styles.link}>
                            <View style={styles.linkLabel}>
                                <Text style={styles.label}>{t(dictionary.privacyPolicy)}</Text>
                            </View>
                            <View style={styles.linkArrow}>
                                <FAIcon size={30} color={colors.BLACK} name={'angle-right'} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        onPress={() => this.props.changeScene('termsConditions')}
                    >
                        <View style={styles.link}>
                            <View style={styles.linkLabel}>
                                <Text style={styles.label}>{t(dictionary.termsConditions)}</Text>
                            </View>
                            <View style={styles.linkArrow}>
                                <FAIcon size={30} color={colors.BLACK} name={'angle-right'} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        onPress={() => this._openMailApp(t(dictionary.reportBug), '')}
                    >
                        <View style={styles.link}>
                            <View style={styles.linkLabel}>
                                <Text style={styles.label}>{t(dictionary.reportBug)}</Text>
                            </View>
                            <View style={styles.linkArrow}>
                                <FAIcon size={30} color={colors.BLACK} name={'angle-right'} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity onPress={this.props.logout}>
                        <View style={styles.logout}>
                            <Text style={styles.logoutText}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.version}>
                        <Text style={styles.versionText}>Mitti V1.0.4</Text>
                    </View>

                    {/* <View style={styles.actions}>
            <Button
              style={styles.button}
              onPress={() => updateMySettings(form)}
              disabled={isUpdatingMySettings}
              title={t(dictionary.save)}
              accessibilityLabel={t(dictionary.save)}
            />
          </View> */}
                </View>
            </ScrollView>
        );
    }

    _openMailApp = (subject, body) => {
        const url = 'mailto:info@digitaldip.ca?',
            subjectParam = 'subject=' + subject,
            bodyParam = '&body=' + body;

        Linking.openURL(url + subjectParam + bodyParam);
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        paddingBottom: 10,
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    heading: {
        marginTop: 20,
        fontSize: font.SIZE_MENU_ICON,
        color: '#000',
        marginBottom: 20,
    },
    field: {
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: font.SIZE_H2,
        color: '#000',
    },
    inputContainer: {
        justifyContent: 'center',
    },
    inputContainerFixedWidth: {
        flex: 1,
    },
    input: {},
    button: {},
    actions: {
        marginTop: 10,
        flexDirection: 'row',
    },
    divider: {
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 20,
        marginBottom: 20,
    },
    link: {
        alignItems: 'stretch',
        // justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    linkLabel: {
        flex: 9,
    },
    linkArrow: {
        alignItems: 'flex-end',
        flex: 1,
    },
    logout: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: font.SIZE_MENU_ICON,
        color: '#ff0000',
        fontWeight: '100',
    },
    version: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    versionText: {
        fontSize: font.SIZE_H2,
    },
});
