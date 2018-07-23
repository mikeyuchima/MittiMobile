import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// components
import AppContainer from './modules/app/AppContainer';

// store
import configureStore from './store/configureStore';

// routes
import { AppNavigator } from './routes';

const store = configureStore();

const AppNavigatorRedux = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(AppNavigatorRedux);

export default class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer>
                    <AppWithNavigationState />
                </AppContainer>
            </Provider>
        );
    }
}
