import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { DEBUG_MODE } from '../../config';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
  } from 'react-navigation-redux-helpers';

export default function configureStore(initialState) {
    let middlewares = [thunk];

    const navigationMiddleware = createReactNavigationReduxMiddleware(
        "root",
        state => state.nav,
    );
    middlewares = [...middlewares, navigationMiddleware];

    if (DEBUG_MODE) {
        const loggerMiddleware = createLogger();
        middlewares = [...middlewares, loggerMiddleware];
    }

    const finalCreateStore = compose(applyMiddleware(...middlewares))(createStore);

    const store = finalCreateStore(rootReducer, initialState);

    return store;
}
