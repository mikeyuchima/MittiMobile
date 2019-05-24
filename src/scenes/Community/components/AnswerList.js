import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import mittiStyles from '../../../styles/mitti';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

// others
import moment from 'moment';

export default class AnswerList extends Component {
  static propTypes = {
    themeColor: PropTypes.string.isRequired,
    isAnswerListOpen: PropTypes.bool.isRequired,
    question: PropTypes.object,
    isFetchingAnswers: PropTypes.bool.isRequired,
    answers: PropTypes.array,
  };

  render() {
    const {isAnswerListOpen, answers, themeColor} = this.props;
    const currentAnswers = answers.map((anAnswer) => {
      return {
        ...anAnswer,
        id: anAnswer._id,
      };
    });

    // check if answer list open
    if(isAnswerListOpen) {
      return (
        <View style={[
          mittiStyles.darkBody,
          mittiStyles.bottomScrollExtra,
          styles.listContainer,
        ]}>
          <View style={styles.titleContainer}>
            <Text style={mittiStyles.darkFontWeak}>
              {t(dictionary.answers).toUpperCase()}
            </Text>
          </View>
          {currentAnswers.map((anAnswer) => <ListItem key={anAnswer.id} answer={anAnswer} themeColor={themeColor} />)}
        </View>
      );
    }
    else {
      return null;
    }
  }
}

const ListItem = ({answer, themeColor}) => {
  const authorName = answer.creator &&
                     answer.creator.profile &&
                     answer.creator.profile.fullName;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <MCIIcon
          size={40}
          color={themeColor}
          name={'comment-check'} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={mittiStyles.darkFontStrong}>
            {answer.answer}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={mittiStyles.darkFontWeak}>
            {authorName}
          </Text>
          <Text style={mittiStyles.darkFontWeak}>
            {moment(answer.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const _renderList = (props) => {
};

const styles = StyleSheet.create({
  listContainer: {
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    backgroundColor: '#121418',
    padding: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  answerAuthor: {
  },
});
