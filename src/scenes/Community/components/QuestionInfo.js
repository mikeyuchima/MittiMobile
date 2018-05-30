import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import mittiStyles from '../../../styles/mitti';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

// others
import moment from 'moment';

export default class QuestionInfo extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    isAnswerListOpen: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
    selectedId: PropTypes.string,
  };

  render() {
    const {me, question} = this.props;

    // check if answer list open
    if(!this.props.isAnswerListOpen) {
      return (
        <GeneralList 
          owner={question.creator}
          createdDate={question.createdAt}
          answerCount={question.answers.length} />
      );
    }
    else {
      // check if my question
      if(question.creator.id == me.id) {
        return (
          <OwnedInfo 
            createdDate={question.createdAt} />
        );
      }
      else {
        return (
          <OthersInfo />
        );
      }
    }
  }
}

const GeneralList = ({owner, createdDate, answerCount}) => {
  return (
    <View style={styles.generalContainer}>
      <View style={styles.bottomLeftContainer}>
        <Text style={[
          mittiStyles.whiteFontWeak,
          styles.bottomText
        ]}>
          {owner.profile.fullName}
        </Text>
      </View>
      <View style={styles.bottomRightContainer}>
        <View style={styles.timestampContainer}>
          <Text style={[
            mittiStyles.whiteFontWeak,
            styles.bottomText
          ]}>
            {moment(createdDate).fromNow()}
          </Text>
        </View>
        <View style={styles.answerCountContainer}>
          <View style={styles.answerIconContainer}>
            <MCIIcon
              size={16}
              style={mittiStyles.whiteFontWeak}
              name={'message-processing'} />
          </View>
          <View style={styles.answerNumberContainer}>
            <Text style={[
              mittiStyles.whiteFontWeak,
              styles.answerNumber
            ]}>
              {answerCount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const OwnedInfo = ({createdDate}) => {
  return (
    <View style={[
      styles.ownedContainer,
      styles.answerListOpen,
    ]}>
      <View style={styles.timestampContainer}>
        <Text style={[
          mittiStyles.whiteFontWeak,
          styles.bottomText
        ]}>
          {moment(createdDate).fromNow()}
        </Text>
      </View>
    </View>
  );
};

const OthersInfo = () => {
  return (
    <View style={[
      styles.ownedContainer,
      styles.answerListOpen,
    ]}>
    </View>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomLeftContainer: {
    flex: 1,
  },
  bottomRightContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  answerListOpen: {
    marginTop: 15,
    marginBottom: 10,
  },
  bottomText: {
    fontSize: 12,
  },
  timestampContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  answerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  answerIconContainer: {
    marginRight: 3,
  },
  answerNumber: {
    fontSize: 16,
  },
});
