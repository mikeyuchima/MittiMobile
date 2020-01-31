import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncStorage } from 'react-native';
import { storeToken, getToken } from '/Users/michael/Documents/MyMittiMobile/src/modules/auth/authActions.js';

// components
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, CheckBox, Platform, Switch } from 'react-native';
import { SpinnerOverlay } from '../../../components';
import { CustomTextInput } from '../../../components';
import { CustomButton } from '../../../components';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// other


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: false };
      }
    

    static propTypes = {
        // states
        form: PropTypes.shape({
            username: PropTypes.string,
            password: PropTypes.string,
        }),

        // actions
        changeFormValue: PropTypes.func.isRequired,

        // module states
        isLoggingIn: PropTypes.bool.isRequired,

        // module actions
        login: PropTypes.func.isRequired,
        changeScene: PropTypes.func.isRequired,
    };

    componentWillMount() {
        AsyncStorage.getItem('checked', (error, res) => {
            console.log('checked', res);
            if (res === 'true') {
                this.setState({ checked: true })
                AsyncStorage.getItem('storePassword', (error, res) => {
                    console.log('password', res);
                    this.props.changeFormValue('password', res)
                });
            }
        });
    }

    _onValueChage = () => {
        if (this.state.checked === false ) this.setState({ checked: true })
        if (this.state.checked === true ) this.setState({ checked: false })
    }

    _login = () => {
        this.props.login(this.props.form.username, this.props.form.password, this.state.checked)
    }
    _guestLogin = (username, password) => {
        this.props.login(username, password, this.state.checked)
    }

    Checkbox = () => {
        switch (Platform.OS) {
            case 'ios':
                return (
                    <Switch
                    value={this.state.checked}
                    onValueChange={this._onValueChage}
                    />
                )
            case 'android':
                return (
                    <CheckBox
                    value={this.state.checked}
                    onValueChange={this._onValueChage}
                    />
                )
        
            default:
                break;
        }
    }

    render() {
        return (
            <ScrollView style={[commonStyles.fullScreen, mittiStyles.darkBody]}>
                <SpinnerOverlay show={this.props.isLoggingIn} />

                <View
                    style={[commonStyles.centeredChilds, mittiStyles.whiteBody, styles.topSegment]}
                >
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/images/logo.png')}
                    />
                    <Text>The Sharing Community</Text>
                </View>
                <View
                    style={[
                        commonStyles.centeredChilds,
                        mittiStyles.bottomScrollExtra,
                        styles.bottomSegment,
                    ]}
                >
                    <View style={[mittiStyles.input, styles.inputContainer]}>
                        <CustomTextInput
                            type={'email'}
                            value={this.props.form.username}
                            onChangeText={username =>
                                this.props.changeFormValue('username', username)
                            }
                            placeholder={t(dictionary.email)}
                            autoFocus={true}
                        />
                    </View>
                    <View style={[mittiStyles.input, styles.inputContainer]}>
                        <CustomTextInput
                            type={'password'}
                            value={this.props.form.password}
                            onChangeText={password =>
                                this.props.changeFormValue('password', password)
                            }
                            placeholder={t(dictionary.password)}
                        />
                    </View>
                    <View style={{ flexDirection: 'column'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <this.Checkbox />
                            <Text style={{marginTop: 5, color: 'white'}}> Remember Me</Text>
                        </View>
                    </View>
                    <View style={mittiStyles.button}>
                        <CustomButton
                            style={styles.button}
                            onPress={this._login}
                            disabled={
                                this.props.isLoggingIn ||
                                !this.props.form.username ||
                                !this.props.form.password
                            }
                            label={t(dictionary.login)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.anchor}
                            onPress={() => this.props.changeScene('createAccount')}
                        >
                            <Text style={[mittiStyles.darkFont,{fontSize: 20}]}>{t(dictionary.createAccount)}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.anchor}
                            onPress={() => this.props.changeScene('forgotPassword')}
                        >
                            <Text style={mittiStyles.darkFont}>{t(dictionary.forgotPassword)}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.anchor}
                            onPress={() => this._guestLogin('mittiguest@outlook.com', 'guest', this.state.checked)}
                        >
                            <Text style={mittiStyles.darkFont}>{t(dictionary.guest)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    topSegment: {
        height: 300,
    },
    bottomSegment: {
        height: 350,
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 5,
    },
    anchor: {
        padding: 10,
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
    },
});
