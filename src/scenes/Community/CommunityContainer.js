import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Community from './components/Community';
import AddPostButton from '../../components/AddPostButton';
import AnswerInput from './components/AnswerInput';
import OptionDropdown from './components/OptionDropdown';
import { SpinnerOverlay, VerificationRequest, CreatePostModal } from '../../components';
import { changeScene } from '../../modules/navigation/navigationActions';
import { requestVerification } from '../../modules/auth/authActions';
import { getMe } from '../../modules/me/meActions';
import {
  openCreatePostModal,
  closeCreatePostModal,
  openAnswerList,
  closeAnswerList,
  changeTextValue,
  setFocusFlag,
  resetFocusFlag,
  findQuestions,
  createAnswer,
  findAnswers,
  markCloseQuestion,
  onRegionChange,
} from './communityActions.js';
import SearchButtonContainer from './SearchButtonContainer';
import OptionButtonContainer from './OptionButtonContainer';
import LeftButtonContainer from './LeftButtonContainer';
import TimestampContainer from './TimestampContainer';
import NavBar from '../../modules/navigation/components/NavBar';
import { getCurrentPosition } from '../../modules/app/appActions';
import { DISTANT_CONVERSION } from '../../constants/constants';
import commonStyles from '../../styles/common';
import { t } from '../../i18n';
import dictionary from './dictionary';
import * as colors from '../../styles/colors';

class CommunityContainer extends Component {
  static propTypes = {
    me: PropTypes.object,
    radius: PropTypes.object,
    isFetchingQuestions: PropTypes.bool.isRequired,
    isFetchingAnswers: PropTypes.bool.isRequired,
    answers: PropTypes.array,
    questions: PropTypes.array,
    question: PropTypes.object,
    isAnswerListOpen: PropTypes.bool.isRequired,
    isOptionDropdownOpen: PropTypes.bool.isRequired,
    isTogglingAnswerList: PropTypes.bool.isRequired,
    openAnswerList: PropTypes.func.isRequired,
    closeAnswerList: PropTypes.func.isRequired,
    changeTextValue: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
    setFocusFlag: PropTypes.func.isRequired,
    resetFocusFlag: PropTypes.func.isRequired,
    isAnswerInputOnFocus: PropTypes.bool.isRequired,
    answerText: PropTypes.string,
    findQuestions: PropTypes.func.isRequired,
    getCurrentPosition: PropTypes.func.isRequired,
    openCreatePostModal: PropTypes.func.isRequired,
    closeCreatePostModal: PropTypes.func.isRequired,
    markCloseQuestion: PropTypes.func.isRequired,
    onRegionChange: PropTypes.func.isRequired,
    requestVerification: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  // static renderNavi
  static navigationOptions = ({ navigation }) => {
    const isOwnQuestion = navigation.getParam('isOwnQuestion', false),
    isQuestionActive = navigation.getParam('isQuestionActive', false),
    isAnswerListOpen = navigation.getParam('isAnswerListOpen'),
    timestamp = navigation.getParam('timestamp');
    const navKey = navigation.state.key;
    
    return {
      headerTitle: (
        <NavBar
          title={t(dictionary.community)}
          leftButton={<LeftButtonContainer navKey={navKey} />}
          rightButton={
            isAnswerListOpen ? (
              isOwnQuestion && isQuestionActive ? (
                <OptionButtonContainer />
              ) : (
                <TimestampContainer timestamp={moment(timestamp).fromNow()} />
              )
            ) : null
          }
        />
      ),
      headerLeft: null,
    };
  };

  componentDidMount() {
    const {
      findQuestions,
      navigation,
      isFetchingQuestions,
      getCurrentPosition,
      currentRegion,
    } = this.props;
    const questionId = navigation && navigation.getParam('questionId');
    
    // check if fetching questions
    if (!isFetchingQuestions) {
      // check if we have question id
      if (questionId) {
        findQuestions(questionId, null, null, navigation.state.key);
      } else {
        getCurrentPosition().then(currentPosition => {
          // check if we have position
          if (currentPosition) {
            const { latitude: lat, longitude: lng } = currentPosition.coords;
            
            // this.props.getItems(lat, lng);
            findQuestions(null, lat, lng, navigation.state.key);
          }
          this._findQuestionsOnMap(currentRegion, currentPosition, true);
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isFetchingQuestions, findQuestions, navigation } = this.props;
    const questionId = navigation && navigation.getParam('questionId');
    const nextQuestionId = nextProps.navigation && nextProps.navigation.getParam('questionId');
    
    // check if fetching questions
    if (!isFetchingQuestions && !nextProps.isFetchingQuestions) {
      // check if we have a question id
      if (nextQuestionId) {
        // check if we already fetched
        if (questionId != nextQuestionId) {
          findQuestions(nextQuestionId, null, null, navigation.state.key);
        } 
        else {
          findAnswers();
        }
      } 
      else {
        this._findQuestionsOnMap(nextProps.currentRegion, nextProps.currentPosition, nextProps.isRegionChanged);
      }
    }
  }

  render() {
    const {
      me,
      isAnswerListOpen,
      answerText,
      changeTextValue,
      changeScene,
      isOptionDropdownOpen,
      setFocusFlag,
      resetFocusFlag,
      isAnswerInputOnFocus,
      createAnswer,
      navigation,
      markCloseQuestion,
    } = this.props;
    const themeColor = colors.PURPLE;
    
    if (!me) {
      return <SpinnerOverlay show={true} />;
    } else if (!me.isVerified) {
      return (
        <VerificationRequest
          username={me.username}
          resend={this.props.requestVerification}
          reload={this.props.refreshScene}
          isOpen={true}
        />
      );
    } else {
      return (
        <View style={commonStyles.fullScreen}>
          <Community {...this.props} themeColor={themeColor} />
          {isAnswerListOpen ? null : (
            <AddPostButton
              onCreatePost={this.props.openCreatePostModal}
              buttonColor={themeColor}
            />
          )}
          {this.props.question.isActive ? (
            <AnswerInput
              createAnswer={createAnswer}
              answerText={answerText}
              changeTextValue={changeTextValue}
              setFocusFlag={setFocusFlag}
              resetFocusFlag={resetFocusFlag}
              isOnFocus={isAnswerInputOnFocus}
              isAnswerListOpen={isAnswerListOpen}
            />
          ) : null}
          {this.props.question.isActive ? (
            <OptionDropdown
              question={this.props.question}
              onMarkClose={() =>
                markCloseQuestion(this.props.question._id, navigation.state.key)
              }
              isOptionDropdownOpen={isOptionDropdownOpen}
            />
          ) : null}
          <CreatePostModal
            changeScene={changeScene}
            isOpen={this.props.isCreatePostModalOpen}
            onClose={this.props.closeCreatePostModal}
          />
        </View>
      );
    }
  }

  _findQuestionsOnMap = (currentRegion, currentPosition, isRegionChanged) => {
    const hasCurrentRegion =
      currentRegion &&
      currentRegion.latitude &&
      currentRegion.longitude;
    const hasCurrentPosition =
      currentPosition &&
      currentPosition.coords &&
      currentPosition.coords.latitude &&
      currentPosition.coords.longitude;
    
    // check if we have position
    if (hasCurrentRegion) {
      const { latitude: lat, longitude: lng } = currentRegion;
      
      // check if region changed
      if (isRegionChanged) {
        this.props.findQuestions(null, lat, lng);
      }
    } 
    else if (hasCurrentPosition) {
      const { latitude: lat, longitude: lng } = currentPosition.coords;
      
      // check if region changed
      if (isRegionChanged) {
        this.props.findQuestions(null, lat, lng);
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    ...state.communityScene,
    me: state.me.me,
    radius: state.radius,
    currentPosition: state.app.currentPosition,
    isGettingCurrentPosition: state.app.isGettingCurrentPosition,
  };
}

export default connect(
  mapStateToProps,
  {
    openAnswerList,
    closeAnswerList,
    changeTextValue,
    setFocusFlag,
    resetFocusFlag,
    getCurrentPosition,
    changeScene,
    findQuestions,
    openCreatePostModal,
    closeCreatePostModal,
    createAnswer,
    findAnswers,
    markCloseQuestion,
    onRegionChange,
    requestVerification,
    getMe,
  }
)(CommunityContainer);
