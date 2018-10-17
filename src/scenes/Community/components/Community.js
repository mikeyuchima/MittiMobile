import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import Map from '../../../modules/map/MapContainer';
import QuestionList from './QuestionList';
import AnswerList from './AnswerList';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

// other
const {width} = Dimensions.get('window');

export default class Community extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    themeColor: PropTypes.string.isRequired,
    isAnswerListOpen: PropTypes.bool.isRequired,
    openAnswerList: PropTypes.func.isRequired,
    closeAnswerList: PropTypes.func.isRequired,
    isFetchingAnswers: PropTypes.bool.isRequired,
    answers: PropTypes.array,
    isFetchingQuestions: PropTypes.bool.isRequired,
    onRegionChange: PropTypes.func.isRequired,
    questions: PropTypes.array,
    question: PropTypes.object,
    onRegionChange: PropTypes.func.isRequired,
  };

  render() {
    const {isAnswerListOpen, questions, question} = this.props;
    const markers = questions.map((q) => {
      return {
        description: q.obj.question,
        id: q.obj._id,
        latitude: q.obj.location.coordinates[0],
        longitude: q.obj.location.coordinates[1],
        title: q.obj.category,
      }
    });
    const mapWidth = Math.floor(width);
    const zoomLevel = 16;

    let currentMarkers = markers;
    let mapSnapshot = '',
        markerLabel = '';

    // check if answer list is open
    if(isAnswerListOpen) {
      // set current markers
      currentMarkers = markers.filter((aMarker) => {
        return aMarker.id == question._id;
      });
      // check if we have coordinates
      if(currentMarkers && currentMarkers[0].latitude && currentMarkers[0].longitude) {
        markerLabel = currentMarkers[0].latitude + ',' + currentMarkers[0].longitude;
        mapSnapshot = 'https://maps.googleapis.com/maps/api/staticmap?center=' + markerLabel + '&zoom=' + zoomLevel + '&scale=1&size=' + mapWidth + 'x100&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C' + markerLabel;
      }
    }

    return (
      <ScrollView style={[
        commonStyles.fullScreen, 
        mittiStyles.darkBody,
      ]}>
        <View>
          <View style={isAnswerListOpen ? mapStyles.mapContainerShort : mapStyles.mapContainer}>
            {
              isAnswerListOpen
              ? <Image 
                  style={styles.mapSnapshot}
                  source={{ uri: mapSnapshot }} />
              : <Map 
                  isMarketplace={false}
                  onCalloutPress={(questionId) => {this._onCalloutPress(questionId)}}
                  onRegionChange={this.props.onRegionChange}
                  currentRegion={this.props.currentRegion}
                  radius={this.props.radius}
                  markers={currentMarkers} />
            }
          </View>
          <QuestionList {...this.props} />
          <AnswerList {...this.props} />
        </View>
      </ScrollView>
    );
  }

  _onCalloutPress = (questionId) => {
    const question = this.props.questions.find((aQuestion) => {
      return aQuestion.obj._id == questionId;
    });

    // check if we have question
    if(question) {
      // check if we have id
      if(!question.obj.id) {
        question.obj.id = question.obj._id;
      }
      this.props.openAnswerList(question.obj);
    }
  }
}

const styles = StyleSheet.create({
  mapSnapshot: {
    height: 100,
  }
});

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: 400,
  },
  mapContainerShort: {
    height: 100,
  },
});
