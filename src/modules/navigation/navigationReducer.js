// action types
import { NAVIGATION_OPEN_DRAWER, NAVIGATION_CLOSE_DRAWER } from './navigationActions';

// other
import { ActionConst } from 'react-native-router-flux';


const initialState = {
    scene: {},
    isDrawerOpen: false,
};

export default function navigation(state = initialState, action) {
    switch (action.type) {
        case ActionConst.JUMP:
        case ActionConst.PUSH:
        case ActionConst.REPLACE:
        case ActionConst.BACK:
        case ActionConst.BACK_ACTION:
        case ActionConst.POP_AND_REPLACE:
        case ActionConst.POP_TO:
        case ActionConst.REFRESH:
        case ActionConst.RESET: {
            const { scene, data } = action;
            return {
                ...state,
                isDrawerOpen: false,
            };
        }
        case ActionConst.FOCUS: {
            const { scene } = action;
            return {
                ...state,
                scene,
                isDrawerOpen: false,
            };
        }
        case NAVIGATION_OPEN_DRAWER: {
            return {
                ...state,
                isDrawerOpen: true,
            };
        }
        case NAVIGATION_CLOSE_DRAWER: {
            return {
                ...state,
                isDrawerOpen: false,
            };
        }
        default: {
            // nothing to do
            return state;
        }
    }
}
