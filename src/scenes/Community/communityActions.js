// api
import * as questionApi from '../../api/questionApi';

// other module actions
import * as appActions from '../../modules/app/appActions';
import * as navigationActions from '../../modules/navigation/navigationActions';

export const COMMUNITY_SCENE_OPEN_ANSWER_LIST = 'COMMUNITY_SCENE_OPEN_ANSWER_LIST';
export const COMMUNITY_SCENE_CLOSE_ANSWER_LIST = 'COMMUNITY_SCENE_CLOSE_ANSWER_LIST';
export const COMMUNITY_SCENE_CHANGE_TEXT_VALUE = 'COMMUNITY_SCENE_CHANGE_TEXT_VALUE';
export const COMMUNITY_SCENE_OPEN_OPTION_DROPDOWN = 'COMMUNITY_SCENE_OPEN_OPTION_DROPDOWN';
export const COMMUNITY_SCENE_CLOSE_OPTION_DROPDOWN = 'COMMUNITY_SCENE_CLOSE_OPTION_DROPDOWN';
export const COMMUNITY_SCENE_SET_FOCUS_FLAG = 'COMMUNITY_SCENE_SET_FOCUS_FLAG';
export const COMMUNITY_SCENE_RESET_FOCUS_FLAG = 'COMMUNITY_SCENE_RESET_FOCUS_FLAG';
export const COMMUNITY_SCENE_FIND_QUESTIONS = 'COMMUNITY_SCENE_FIND_QUESTIONS';
export const COMMUNITY_SCENE_FIND_QUESTIONS_SUCCESS = 'COMMUNITY_SCENE_FIND_QUESTIONS_SUCCESS';
export const COMMUNITY_SCENE_FIND_QUESTIONS_ERROR = 'COMMUNITY_SCENE_FIND_QUESTIONS_ERROR';
export const COMMUNITY_SCENE_FIND_QUESTION = 'COMMUNITY_SCENE_FIND_QUESTION';
export const COMMUNITY_SCENE_FIND_QUESTION_SUCCESS = 'COMMUNITY_SCENE_FIND_QUESTION_SUCCESS';
export const COMMUNITY_SCENE_FIND_QUESTION_ERROR = 'COMMUNITY_SCENE_FIND_QUESTION_ERROR';
export const COMMUNITY_SCENE_CREATE_POST_OPEN = 'COMMUNITY_SCENE_CREATE_POST_OPEN';
export const COMMUNITY_SCENE_CREATE_POST_CLOSE = 'COMMUNITY_SCENE_CREATE_POST_CLOSE';
export const COMMUNITY_SCENE_FIND_ANSWERS = 'COMMUNITY_SCENE_FIND_ANSWERS';
export const COMMUNITY_SCENE_FIND_ANSWERS_SUCCESS = 'COMMUNITY_SCENE_FIND_ANSWERS_SUCCESS';
export const COMMUNITY_SCENE_FIND_ANSWERS_ERROR = 'COMMUNITY_SCENE_FIND_ANSWERS_ERROR';
export const COMMUNITY_SCENE_CREATE_ANSWER = 'COMMUNITY_SCENE_CREATE_ANSWER';
export const COMMUNITY_SCENE_CREATE_ANSWER_SUCCESS = 'COMMUNITY_SCENE_CREATE_ANSWER_SUCCESS';
export const COMMUNITY_SCENE_CREATE_ANSWER_ERROR = 'COMMUNITY_SCENE_CREATE_ANSWER_ERROR';
export const COMMUNITY_SCENE_MARK_CLOSE_QUESTION = 'COMMUNITY_SCENE_MARK_CLOSE_QUESTION';
export const COMMUNITY_SCENE_MARK_CLOSE_QUESTION_SUCCESS =
    'COMMUNITY_SCENE_MARK_CLOSE_QUESTION_SUCCESS';
export const COMMUNITY_SCENE_MARK_CLOSE_QUESTION_ERROR =
    'COMMUNITY_SCENE_MARK_CLOSE_QUESTION_ERROR';
export const COMMUNITY_SCENE_REGION_CHANGE = 'COMMUNITY_SCENE_REGION_CHANGE';

export const findQuestions = (questionId, lat, lng, navKey) => {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        // check if we have a question id
        if (questionId) {
            dispatch({
                type: COMMUNITY_SCENE_FIND_QUESTION,
                questionId,
            });

            return questionApi
                .getById(token, questionId)
                .then(resp => dispatch(appActions.processApiResponse(resp)))
                .then(question => {
                    dispatch({
                        type: COMMUNITY_SCENE_FIND_QUESTION_SUCCESS,
                        question,
                    });
                    // open answer list
                    dispatch(openAnswerList(question, navKey));

                    return question;
                })
                .catch(error => {
                    dispatch({
                        type: COMMUNITY_SCENE_FIND_QUESTION_ERROR,
                        error,
                    });
                    return error;
                });
        } else {
            const { radius, radiusUnit } = getState().radius;

            dispatch({
                type: COMMUNITY_SCENE_FIND_QUESTIONS,
                lat,
                lng,
                radius,
                radiusUnit,
            });

            return questionApi
                .find(token, lat, lng, radius, radiusUnit)
                .then(resp => dispatch(appActions.processApiResponse(resp)))
                .then(questions => {
                    let question = {};

                    dispatch({
                        type: COMMUNITY_SCENE_FIND_QUESTIONS_SUCCESS,
                        questions,
                    });

                    return questions;
                })
                .catch(error => {
                    dispatch({
                        type: COMMUNITY_SCENE_FIND_QUESTIONS_ERROR,
                        error,
                    });
                    return error;
                });
        }
    };
};

export const openAnswerList = (question, navKey) => {
    return (dispatch, getState) => {
        const state = getState();
        const me = state &&
                   state.me &&
                   state.me.me;
        const isOwnQuestion = question.creator.id == me.id;
        // const params = {
        //     question,
        // };

        dispatch({
            type: COMMUNITY_SCENE_OPEN_ANSWER_LIST,
            question,
            me,
        });
        // dispatch(navigationActions.refreshScene('community', params));
        dispatch(navigationActions.setParams(navKey, {
            isOwnQuestion, 
            isQuestionActive: question.isActive,
            isAnswerListOpen: true, 
            timestamp: question.createdAt,
        }));
        dispatch(findAnswers());
    };
};

export const closeAnswerList = (navKey) => {
    return (dispatch, getState) => {
        dispatch({
            type: COMMUNITY_SCENE_CLOSE_ANSWER_LIST,
        });
        dispatch(navigationActions.setParams(navKey, {
            isAnswerListOpen: false, 
        }));
    };
};

export const changeTextValue = answerText => ({
    type: COMMUNITY_SCENE_CHANGE_TEXT_VALUE,
    answerText,
});

export const openOptionDropdown = () => ({
    type: COMMUNITY_SCENE_OPEN_OPTION_DROPDOWN,
});

export const closeOptionDropdown = () => ({
    type: COMMUNITY_SCENE_CLOSE_OPTION_DROPDOWN,
});

export const setFocusFlag = () => ({
    type: COMMUNITY_SCENE_SET_FOCUS_FLAG,
});

export const resetFocusFlag = () => ({
    type: COMMUNITY_SCENE_RESET_FOCUS_FLAG,
});

export const openCreatePostModal = () => ({
    type: COMMUNITY_SCENE_CREATE_POST_OPEN,
});

export const closeCreatePostModal = () => ({
    type: COMMUNITY_SCENE_CREATE_POST_CLOSE,
});

export const findAnswers = () => {
    return (dispatch, getState) => {
        const { question } = getState().communityScene;
        const { token } = getState().auth;

        const questionId = question._id;

        dispatch({
            type: COMMUNITY_SCENE_FIND_ANSWERS,
            questionId,
        });

        return questionApi
            .findAnswers(token, questionId)
            .then(resp => dispatch(appActions.processApiResponse(resp)))
            .then(answers => {
                dispatch({
                    type: COMMUNITY_SCENE_FIND_ANSWERS_SUCCESS,
                    answers,
                });

                return answers;
            })
            .catch(error => {
                dispatch({
                    type: COMMUNITY_SCENE_FIND_ANSWERS_ERROR,
                    error,
                });
                return error;
            });
    };
};

export const createAnswer = () => {
    return (dispatch, getState) => {
        const { answerText: answer, question } = getState().communityScene;
        const { token } = getState().auth;

        const questionId = question.id;

        const data = {
            answer,
        };

        dispatch({
            type: COMMUNITY_SCENE_CREATE_ANSWER,
            data,
        });

        return questionApi
            .createAnswer(token, questionId, data)
            .then(resp => dispatch(appActions.processApiResponse(resp)))
            .then(answer => {
                dispatch({
                    type: COMMUNITY_SCENE_CREATE_ANSWER_SUCCESS,
                    answer,
                });

                dispatch(resetFocusFlag());

                return answer;
            })
            .catch(error => {
                dispatch({
                    type: COMMUNITY_SCENE_CREATE_ANSWER_ERROR,
                    error,
                });
                return error;
            });
    };
};

export const markCloseQuestion = (navKey) => {
    return (dispatch, getState) => {
        const { question } = getState().communityScene;
        const { token } = getState().auth;

        const questionId = question.id;
        const data = {
            isActive: false,
        };

        dispatch(closeOptionDropdown());

        dispatch({
            type: COMMUNITY_SCENE_MARK_CLOSE_QUESTION,
            questionId,
        });

        return questionApi
            .update(token, questionId, data)
            .then(resp => dispatch(appActions.processApiResponse(resp)))
            .then(question => {
                dispatch({
                    type: COMMUNITY_SCENE_MARK_CLOSE_QUESTION_SUCCESS,
                    question,
                });
                dispatch(closeAnswerList(navKey));

                return question;
            })
            .catch(error => {
                dispatch({
                    type: COMMUNITY_SCENE_MARK_CLOSE_QUESTION_ERROR,
                    error,
                });
                return error;
            });
    };
};

export const onRegionChange = region => {
    return (dispatch, getState) => {
        dispatch({
            type: COMMUNITY_SCENE_REGION_CHANGE,
            region,
        });
    };
};
