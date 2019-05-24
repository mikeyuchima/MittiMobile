import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { DEBUG_MODE } from '../../config';
// import { navigationMiddleware } from '../routes';

export default function configureStore(initialState) {
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
