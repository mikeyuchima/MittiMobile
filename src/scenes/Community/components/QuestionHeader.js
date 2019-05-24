import React, {Component} from 'react'; import PropTypes from 'prop-types';
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
import {QUESTION_CATEGORIES} from '../../../constants/constants';

export default class QuestionHeader extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    themeColor: PropTypes.string.isRequired,
    isAnswerListOpen: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
  };

  render() {
    const {me, question, themeColor, isAnswerListOpen} = this.props;
    let authorName = question.creator &&
                     question.creator.profile &&
                     question.creator.profile.fullName;

    // check if answer list open
    if(!isAnswerListOpen) {
      return (
        <General 
          themeColor={themeColor}
          category={question.category} />
      );
    }
    else {
      // check if my question
      if(question.creator.id == me.id) {
        authorName = t(dictionary.me);
      }

      return (
        <Others authorName={authorName} />
      );
    }
  }
}

const General = ({themeColor, category}) => {
  let categoryObj = QUESTION_CATEGORIES[category];

  return (
    <View style={styles.itemTitle}>
      <View style={styles.indicatorContainer}>
        <MCIIcon
          size={20}
          color={themeColor}
          name={categoryObj.iconName} />
      </View>
      <View style={styles.categoryContainer}>
        <Text style={[
          mittiStyles.whiteFontStrong,
          mittiStyles.textBold,
        ]}>
          {categoryObj.label}
        </Text>
      </View>
    </View>
  );
};

const Others = ({authorName}) => {
  return (
    <View style={styles.itemTitle}>
      <View style={styles.indicatorContainer}>
        <MCIIcon
          size={20}
          name={'account-circle'} />
      </View>
      <View style={styles.categoryContainer}>
        <Text style={[
          mittiStyles.whiteFontStrong,
        ]}>
          {authorName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  indicatorContainer: {
    marginRight: 5,
  },
});
