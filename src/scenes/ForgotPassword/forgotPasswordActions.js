export const FORGOT_PASSWORD_SCENE_CHANGE_FORM_VALUE = 'FORGOT_PASSWORD_SCENE_CHANGE_FORM_VALUE';

export const changeFormValue = (name, value) => ({
  type: FORGOT_PASSWORD_SCENE_CHANGE_FORM_VALUE,
  name,
  value,
});
