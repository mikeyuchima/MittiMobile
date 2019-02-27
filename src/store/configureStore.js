import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { DEBUG_MODE } from '../../config';
// import { navigationMiddleware } from '../routes';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import appReducer from '../index';

export default function configureStore(initialState) {
    const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

    let middlewares = [thunk, navigationMiddleware];

    if (DEBUG_MODE) {
        const loggerMiddleware = createLogger();
        middlewares = [...middlewares, loggerMiddleware];
    }

    const finalCreateStore = compose(applyMiddleware(...middlewares))(
        createStore(appReducer, applyMiddleware(navigationMiddleware))
    );

    const store = finalCreateStore(rootReducer, initialState);

    return store;
}
