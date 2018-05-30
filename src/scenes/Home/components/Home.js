import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import Menu from './Menu';
import QuestionList from './QuestionList';
import Map from '../../../modules/map/MapContainer';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class Home extends Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    getMarkers: PropTypes.func.isRequired,
    markers: PropTypes.array.isRequired,
    unreadMessages: PropTypes.array.isRequired,
    myQuestions: PropTypes.array.isRequired,
    isFetchingMyQuestions: PropTypes.bool.isRequired,
    changeScene: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    onRegionChange: PropTypes.func.isRequired,
    item: PropTypes.object,
  };

  static defaultProps = {
    markers: [],
  };

  render() {
    // check if you have current region
    if(this.props.currentRegion) {
      return (
        <ScrollView style={[
          commonStyles.fullScreen, 
          mittiStyles.topWithNavBar,
          mittiStyles.darkBody,
        ]}>

          <View style={mittiStyles.bottomScrollExtra}>
            <View style={mapStyles.mapContainer}>
              <Map 
                item={this.props.item}
                getItem={this.props.getPost}
                onRegionChange={this.props.onRegionChange}
                currentRegion={this.props.currentRegion}
                radius={this.props.radius}
                markers={this.props.markers} />
            </View>
            <Menu 
              me={this.props.me} 
              unreadMessages={this.props.unreadMessages} 
              changeScene={this.props.changeScene}/>
            <QuestionList 
              questions={this.props.myQuestions} 
              isFetching={this.props.isFetchingMyQuestions}
              changeScene={this.props.changeScene} />
          </View>
        </ScrollView>
      );
    }
    else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
});

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: 400,
    marginBottom: 20,
  },
});
