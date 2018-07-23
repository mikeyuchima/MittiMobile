import React, { Component } from 'react';
import { Provider } from 'react-redux';

// components
import AppContainer from './modules/app/AppContainer';

// store
import configureStore from './store/configureStore';

// routes
import { AppNavigator } from './routes';

const store = configureStore();

export default class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer>
                    <AppNavigator />
                </AppContainer>
            </Provider>
        );
    }
}
