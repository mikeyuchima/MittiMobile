import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import QuestionHeader from './QuestionHeader';
import QuestionInfo from './QuestionInfo';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import mittiStyles from '../../../styles/mitti';
import commonStyles from '../../../styles/common';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class QuestionList extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    themeColor: PropTypes.string.isRequired,
    isAnswerListOpen: PropTypes.bool.isRequired,
    openAnswerList: PropTypes.func.isRequired,
    closeAnswerList: PropTypes.func.isRequired,
    questions: PropTypes.array,
    question: PropTypes.object,
    isFetchingQuestions: PropTypes.bool.isRequired,
  };

  render() {
    const {question, questions, isAnswerListOpen} = this.props;

    let currentQuestionList = questions.map((aQuestion) => {
      return {
        ...aQuestion.obj,
        id: aQuestion.obj._id,
      };
    });

    // check if answer list open
    if(isAnswerListOpen) {
      // get a question
      currentQuestionList = currentQuestionList.filter((aQuestion) => {
        return aQuestion.id == question.id;
      });
    }

    return (
      <View style={[
        mittiStyles.whiteBody,
        styles.questionListContainer,
        isAnswerListOpen ? {} : mittiStyles.bottomScrollExtra,
      ]}>
        {currentQuestionList.map((aQuestion) => <ListItem {...this.props} key={aQuestion.id} question={aQuestion} />)}
        {this.props.isFetchingQuestions && <View style={commonStyles.centeredChilds}><Spinner color={'black'} /></View>}
      </View>
    );
  }
}

const ListItem = ({
  me, 
  question, 
  isAnswerListOpen, 
  closeAnswerList, 
  openAnswerList, 
  themeColor,
}) => {
  return (
    <TouchableOpacity
      onPress={() => { !isAnswerListOpen ? openAnswerList(question) : null }}
      style={styles.itemContainer}>

      <QuestionHeader 
        me={me}
        themeColor={themeColor}
        isAnswerListOpen={isAnswerListOpen}
        question={question}
      />
      <View style={styles.itemContent}>
        <Text style={mittiStyles.whiteStrong}>
          {question.question}
        </Text>
      </View>
      <QuestionInfo 
        me={me}
        isAnswerListOpen={isAnswerListOpen}
        selectedId={question && question.id}
        question={question}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  questionListContainer: {
  },
  itemContainer: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
});
