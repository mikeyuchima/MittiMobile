// actiom types
export const RADIUS_OPEN_DROPDOWN = 'RADIUS_OPEN_DROPDOWN';
export const RADIUS_CLOSE_DROPDOWN = 'RADIUS_CLOSE_DROPDOWN';
export const RADIUS_CHANGE_VALUE = 'RADIUS_CHANGE_VALUE';
export const RADIUS_SET_DEFAULT_RADIUS = 'RADIUS_SET_DEFAULT_RADIUS';

export const openDropdown = () => {
  return (dispatch, getState) => {
    dispatch({
      type: RADIUS_OPEN_DROPDOWN,
    });
  };
};

export const closeDropdown = () => {
  return (dispatch, getState) => {
    dispatch({
      type: RADIUS_CLOSE_DROPDOWN,
    });
  };
};

export const changePickerValue = (radius, radiusUnit) => {
  return (dispatch, getState) => {
    dispatch({
      type: RADIUS_CHANGE_VALUE,
      radius,
      radiusUnit,
    });
  };
};

export const setDefaultRadius = (defaultRadius, radiusUnit) => {
  return (dispatch, getState) => {
    dispatch({
      type: RADIUS_SET_DEFAULT_RADIUS,
      defaultRadius,
      radiusUnit,
    });
  };
};
