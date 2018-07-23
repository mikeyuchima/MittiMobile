// api
import * as questionApi from '../../api/questionApi';

// actions
import * as appActions from '../../modules/app/appActions';
import * as navigationActions from '../../modules/navigation/navigationActions';

// i18n
import dictionary from './dictionary';
import { t } from '../../i18n';

// others

import { ActionConst } from 'react-native-router-flux';

export const CREATE_QUESTION_SCENE_SET_QUESTION_CATEGORY_ID =
    'CREATE_QUESTION_SCENE_SET_QUESTION_CATEGORY_ID';
export const CREATE_QUESTION_SCENE_CHANGE_FORM_VALUE = 'CREATE_QUESTION_SCENE_CHANGE_FORM_VALUE';
export const CREATE_QUESTION_SCENE_SET_POSITION = 'CREATE_QUESTION_SCENE_SET_POSITION';
export const CREATE_QUESTION_SCENE_SET_ADDRESS = 'CREATE_QUESTION_SCENE_SET_ADDRESS';
export const CREATE_QUESTION_SCENE_CANCEL_QUESTION = 'CREATE_QUESTION_SCENE_CANCEL_QUESTION';
export const CREATE_QUESTION_SCENE_CREATE = 'CREATE_QUESTION_SCENE_CREATE';
export const CREATE_QUESTION_SCENE_CREATE_SUCCESS = 'CREATE_QUESTION_SCENE_CREATE_SUCCESS';
export const CREATE_QUESTION_SCENE_CREATE_ERROR = 'CREATE_QUESTION_SCENE_CREATE_ERROR';

export const setQuestionCategoryId = id => ({
    type: CREATE_QUESTION_SCENE_SET_QUESTION_CATEGORY_ID,
    categoryId: id,
});

export const changeFormValue = (name, value) => ({
    type: CREATE_QUESTION_SCENE_CHANGE_FORM_VALUE,
    name,
    value,
});

export const setPosition = position => ({
    type: CREATE_QUESTION_SCENE_SET_POSITION,
    position,
});

export const setAddress = address => ({
    type: CREATE_QUESTION_SCENE_SET_ADDRESS,
    address,
});

export const cancelQuestion = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_QUESTION_SCENE_CANCEL_QUESTION,
        });
        dispatch(navigationActions.changeScene('home', {}, ActionConst.RESET));
    };
};

export const createQuestion = () => {
    return (dispatch, getState) => {
        const {
            categoryId: category,
            form: { question, address },
            position,
        } = getState().createQuestionScene;
        const { token } = getState().auth;

        const data = {
            category,
            question,
            lat: position.lat,
            lng: position.lng,
            address,
        };

        dispatch({
            type: CREATE_QUESTION_SCENE_CREATE,
            data,
        });

        return questionApi
            .create(token, data)
            .then(resp => dispatch(appActions.processApiResponse(resp)))
            .then(question => {
                dispatch({
                    type: CREATE_QUESTION_SCENE_CREATE_SUCCESS,
                    question,
                });

                dispatch(navigationActions.changeScene('home', {}, ActionConst.RESET));
                dispatch(appActions.onMessage(t(dictionary.createSuccess)));
                return question;
            })
            .catch(error => {
                dispatch({
                    type: CREATE_QUESTION_SCENE_CREATE_ERROR,
                    error,
                });
                return error;
            });
    };
};
