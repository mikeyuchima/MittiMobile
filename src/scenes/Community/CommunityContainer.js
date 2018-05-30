import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import Community from './components/Community';
import AddPostButton from '../../components/AddPostButton';
import AnswerInput from './components/AnswerInput';
import OptionDropdown from './components/OptionDropdown';
import {
  SpinnerOverlay, 
  VerificationRequest, 
  CreatePostModal
} from '../../components';
import {changeScene, refreshScene} from '../../modules/navigation/navigationActions';
import {requestVerification} from '../../modules/auth/authActions';
import {getMe} from '../../modules/me/meActions';
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
import {getCurrentPosition} from '../../modules/app/appActions';
import {
  DISTANT_CONVERSION,
} from '../../constants/constants';
import commonStyles from '../../styles/common';
import {t} from '../../i18n';
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
    openAnswerList: PropTypes.func.isRequired,
    closeAnswerList: PropTypes.func.isRequired,
    changeTextValue: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
    refreshScene: PropTypes.func.isRequired,
    setFocusFlag: PropTypes.func.isRequired,
    resetFocusFlag: PropTypes.func.isRequired,
    isAnswerInputOnFocus: PropTypes.bool.isRequired,
    answerText: PropTypes.string,
    findQuestions: PropTypes.func.isRequired,
    getCurrentPosition: PropTypes.func.isRequired,
    openCreatePostModal: PropTypes.func.isRequired,
    closeCreatePostModal: PropTypes.func.isRequired,
    markCloseQuestion: PropTypes.func.isRequired,
    navigationParams: PropTypes.object,
    onRegionChange: PropTypes.func.isRequired,
    requestVerification: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  static renderNavigationBar = (props) => {
    if(!props.me || !props.me.isVerified) {
      return null;
    }
    else {
      return (
        <NavBar
          title={t(dictionary.community)}
          leftButton={<LeftButtonContainer />}
          rightButton={
            props.question
            ? (props.question.creator.id === props.me.id 
              ? <OptionButtonContainer /> 
              : <TimestampContainer timestamp={moment(props.question.createdAt).fromNow()} />) 
            : null
          }
        />
      );
    }
  };

  componentDidMount() {
    const {findQuestions, navigationParams, isFetchingQuestions} = this.props;
    const questionId = navigationParams && navigationParams.questionId;

    // check if fetching questions
    if(!isFetchingQuestions) {
      // check if we have question id
      if(questionId) {
        findQuestions(questionId);
      }
      else {
        this.props
          .getCurrentPosition()
          .then((currentPosition) => {
              // check if we have position
              if(currentPosition) {
                // const {latitude: lat, longitude: lng} = currentPosition.coords;
                // this.props.getItems(lat, lng);
                findQuestions();
            }
          });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {findQuestions, navigationParams} = this.props;
    const questionId = navigationParams && navigationParams.questionId;
    const nextQuestionId = nextProps.navigationParams &&
                           nextProps.navigationParams.questionId;

    // check if fetching questions
    if(!nextProps.isFetchingQuestions) {
      // check if we have a question id
      if(nextQuestionId) {
        // check if we already fetched
        if(questionId != nextQuestionId) {
          findQuestions(nextQuestionId);
        }
      }
      else {
        // check if we have position
        if(nextProps.currentRegion) {
          const {latitude: lat, longitude: lng} = nextProps.currentRegion;

          // check if region changed
          if(nextProps.isRegionChanged) {
            // @TODO - we need to changed this based on region
            findQuestions();
          }
        }
      }
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const currentQuestionId = this.props.question ? this.props.question.id : null;
  //   if (nextProps.question && currentQuestionId !== nextProps.question.id) {

  //   }
  // }

  render() {
    const {
      me, 
      navigation,
      isAnswerListOpen, 
      answerText, 
      changeTextValue, 
      changeScene, 
      question,
      isOptionDropdownOpen,
      setFocusFlag,
      resetFocusFlag,
      isAnswerInputOnFocus,
      createAnswer,
      findAnswers,
      answers,
      markCloseQuestion,
    } = this.props;
    const themeColor = colors.PURPLE;

    if (!me) {
      return <SpinnerOverlay show={true} />
    }
    else if(!me.isVerified) {
      return <VerificationRequest 
               username={me.username}
               resend={this.props.requestVerification}
               reload={this.props.refreshScene}
               isOpen={true} />
    }
    else {
      return (
        <View style={commonStyles.fullScreen}>
          <Community 
            {...this.props} 
            themeColor={themeColor} />
          {
            isAnswerListOpen ? 
            null :
            <AddPostButton 
              onCreatePost={this.props.openCreatePostModal}
              buttonColor={themeColor}
            />
          }
          <AnswerInput
            createAnswer={createAnswer}
            answerText={answerText}
            changeTextValue={changeTextValue}
            setFocusFlag={setFocusFlag}
            resetFocusFlag={resetFocusFlag}
            isOnFocus={isAnswerInputOnFocus}
            isAnswerListOpen={isAnswerListOpen} />
          <OptionDropdown
            onMarkClose={markCloseQuestion}
            isOptionDropdownOpen={isOptionDropdownOpen} />
          <CreatePostModal
            changeScene={changeScene}
            isOpen={this.props.isCreatePostModalOpen}
            onClose={this.props.closeCreatePostModal} />
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    ...state.communityScene,
    me: state.me.me,
    radius: state.radius,
    navigation: state.navigation.scene,
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
    refreshScene,
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
