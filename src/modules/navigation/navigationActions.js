// router actions
import {Actions, ActionConst} from 'react-native-router-flux';

// actiom types
export const NAVIGATION_OPEN_DRAWER = 'NAVIGATION_OPEN_DRAWER';
export const NAVIGATION_CLOSE_DRAWER = 'NAVIGATION_CLOSE_DRAWER';

export const changeScene = (sceneKey, params = {}, type = ActionConst.PUSH) => {
  return (dispatch, getState) => {
    Actions[sceneKey]({
      ...params,
      type
    });
  };
};

export const refreshScene = (sceneKey, params = {}) => {
  return (dispatch, getState) => {
    Actions.refresh({
      key: sceneKey,
      ...params,
    });
  };
};

export const back = () => {
  return (dispatch, getState) => {
    Actions.pop();
  };
};

export const openDrawer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: NAVIGATION_OPEN_DRAWER,
    });
  };
};

export const closeDrawer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: NAVIGATION_CLOSE_DRAWER,
    });
  };
};
