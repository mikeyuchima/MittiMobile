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

export default class ChooseCategory extends Component {
  static propTypes = {
    changeScene: PropTypes.func.isRequired,
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
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'artsAndCulture')}
                style={styles.leftCellContainer}
                key={'artsAndCulture'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'palette'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.artsAndCulture)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'businessAndFinance')}
                style={styles.rightCellContainer}
                key={'businessAndFinance'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'briefcase'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.businessAndFinance)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'carsAndTransportation')}
                style={styles.leftCellContainer}
                key={'carsAndTransportation'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'car'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.carsAndTransportation)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'computersAndInternet')}
                style={styles.rightCellContainer}
                key={'computersAndInternet'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'monitor'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.computersAndInternet)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'electronics')}
                style={styles.leftCellContainer}
                key={'electronics'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'cellphone'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.electronics)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'educationAndReference')}
                style={styles.rightCellContainer}
                key={'educationAndReference'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'book'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.educationAndReference)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'entertainment')}
                style={styles.leftCellContainer}
                key={'entertainment'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'puzzle'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.entertainment)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'environment')}
                style={styles.rightCellContainer}
                key={'environment'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'tree'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.environment)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'foodAndDrink')}
                style={styles.leftCellContainer}
                key={'foodAndDrink'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'food'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.foodAndDrink)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'health')}
                style={styles.rightCellContainer}
                key={'health'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'stethoscope'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.health)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'newsAndEvents')}
                style={styles.leftCellContainer}
                key={'newsAndEvents'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'newspaper'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.newsAndEvents)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'pets')}
                style={styles.rightCellContainer}
                key={'pets'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'cat'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.pets)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'government')}
                style={styles.leftCellContainer}
                key={'government'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'domain'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.government)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'societyAndCulture')}
                style={styles.rightCellContainer}
                key={'societyAndCulture'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'google-circles-communities'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.societyAndCulture)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[
              styles.rowContainer,
              styles.rowContainerBorder,
            ]}>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'sports')}
                style={styles.leftCellContainer}
                key={'sports'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'football'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.sports)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'travel')}
                style={styles.rightCellContainer}
                key={'travel'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'wallet-travel'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.travel)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[
              styles.rowContainer,
            ]}>
              <TouchableOpacity
                onPress={() => _createQuestion(this.props, 'other')}
                style={styles.leftCellContainer}
                key={'other'}>
                <MCIIcon 
                  style={styles.icon}
                  size={40}
                  color={'#C92FEE'}
                  name={'dots-horizontal'}/>
                <Text style={mittiStyles.whiteFontStrong}>
                  {t(dictionary.other)}
                </Text>
              </TouchableOpacity>
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
}

const _createQuestion = (props, id) => {
  // set category id
  props.setQuestionCategoryId(id);
  // change to create question scene
  props.changeScene(SCENES.createQuestion.key);
};

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
