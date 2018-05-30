import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

// other
import {SCENES} from '../../../routes';
import {QUESTION_CATEGORIES} from '../../../constants/constants';

const QuestionCategory = ({id, iconName, onPress, isLeft}) => (
  <TouchableOpacity
    onPress={() => onPress(id)}
    style={isLeft ? styles.leftCellContainer : styles.rightCellContainer}
    key={id}>
    <MCIIcon 
      style={styles.icon}
      size={40}
      color={'#C92FEE'}
      name={iconName}/>
    <Text style={mittiStyles.whiteFontStrong}>
      {t(dictionary[id])}
    </Text>
  </TouchableOpacity>
);

export default class ChooseCategory extends Component {
  static propTypes = {
    changePrevScene: PropTypes.func.isRequired,
    setQuestionCategoryId: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView style={mittiStyles.darkBody}>
        <View style={[
          commonStyles.fullScreen, 
          styles.main,
        ]}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity 
              onPress={() => this.props.changePrevScene()}
              style={styles.closeButton}>
              <MCIIcon 
                size={30}
                color={colors.WHITE}
                name={'close'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <MCIIcon 
              style={styles.titleIcon}
              size={30}
              color={'#C92FEE'}
              name={'comment-question-outline'}/>
            <Text style={[
              mittiStyles.darkFontStrong,
              styles.title,
            ]}>
              {t(dictionary.askQuestionToCommunity).toUpperCase()}
            </Text>
            <Text style={[
              mittiStyles.darkFontStrong,
              styles.subtitle,
            ]}>
              {t(dictionary.chooseTopic).toUpperCase()}:
            </Text>
          </View>
          <View style={[
            mittiStyles.whiteBody,
            styles.menuContainer,
          ]}>
            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.artsCultures} onPress={this._createQuestion} isLeft />
              <QuestionCategory {...QUESTION_CATEGORIES.businessesFinances} onPress={this._createQuestion} />
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.carsTransportations} onPress={this._createQuestion} isLeft />
              <QuestionCategory {...QUESTION_CATEGORIES.computersInternets} onPress={this._createQuestion} />
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.electronics} onPress={this._createQuestion} isLeft />
              <QuestionCategory {...QUESTION_CATEGORIES.educationsReferences} onPress={this._createQuestion} />
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.entertainments} onPress={this._createQuestion} isLeft />
              <QuestionCategory {...QUESTION_CATEGORIES.environments} onPress={this._createQuestion} />
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.foodsDrinks} onPress={this._createQuestion} isLeft />
              <QuestionCategory {...QUESTION_CATEGORIES.health} onPress={this._createQuestion} />
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.newsEvents} onPress={this._createQuestion} isLeft />
              <QuestionCategory {...QUESTION_CATEGORIES.pets} onPress={this._createQuestion} />
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.governments} onPress={this._createQuestion} isLeft />
              <QuestionCategory {...QUESTION_CATEGORIES.societiesCultures} onPress={this._createQuestion} />
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.sports} onPress={this._createQuestion} isLeft />
              <QuestionCategory {...QUESTION_CATEGORIES.travels} onPress={this._createQuestion} />
            </View>

            <View style={[
              styles.rowContainer,
            ]}>
              <QuestionCategory {...QUESTION_CATEGORIES.others} onPress={this._createQuestion} isLeft />
              <TouchableOpacity
                style={styles.rightCellContainer}
                key={'empty'}>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    );
  }

  _createQuestion = (id) => {
    // set category id
    this.props.setQuestionCategoryId(id);
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    padding: 20,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButton: {
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleIcon: {
    margin: 10,
  },
  subtitle: {
    fontSize: 22,
  },
  menuContainer: {
    flex: 1,
    padding: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#BCBCBC',
  },
  icon: {
    padding: 20,
  },
  leftCellContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#BCBCBC',
  },
  rightCellContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  askQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  askQuestionLabel: {
    marginLeft: 10,
  },
});
