export const REGISTER_SCENE_CHANGE_FORM_VALUE = 'REGISTER_SCENE_CHANGE_FORM_VALUE';

export const changeFormValue = (name, value) => ({
  type: REGISTER_SCENE_CHANGE_FORM_VALUE,
  name,
  value,
});
