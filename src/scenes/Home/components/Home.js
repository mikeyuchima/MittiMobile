import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
  Dimensions,
  RefreshControl
} from 'react-native';

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
  constructor(props) {
    super(props);
    this.state = {
      isRefresing: false,
    };
  }
  static propTypes = {
    me: PropTypes.object.isRequired,
    getMarkers: PropTypes.func.isRequired,
    markers: PropTypes.array.isRequired,
    unreadMessages: PropTypes.number.isRequired,
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

  onRefresh = () => {
    const { refreshScene } = this.props
    this.setState({isRefresing: true})
    refreshScene('home')
    this.setState({isRefresing: false})
  }

  render() {
    // check if you have current region
    if(this.props.currentRegion) {
      return (
        <ScrollView style={[
          commonStyles.fullScreen, 
          mittiStyles.darkBody,
        ]}
        refreshControl={<RefreshControl refreshing={this.state.isRefresing} onRefresh={this.onRefresh} />}
        >
          <View style={mittiStyles.bottomScrollExtra}>
            <View style={mapStyles.mapContainer}>
              <Map 
                item={this.props.item}
                getItem={this.props.getPost}
                onRegionChange={this.props.onRegionChange}
                currentRegion={this.props.currentRegion}
                radius={this.props.radius}
                markers={this.props.markers} 
                />
            </View>
            <Menu 
              me={this.props.me} 
              unreadMessages={this.props.unreadMessages} 
              changeScene={this.props.changeScene}/>
            { this._getQuestionList() }
          </View>
        </ScrollView>
      );
    }
    else {
      return (
        <ScrollView style={[
          commonStyles.fullScreen, 
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
                markers={this.props.markers} 
                />
            </View>
            <Menu 
              me={this.props.me} 
              unreadMessages={this.props.unreadMessages} 
              changeScene={this.props.changeScene}/>
            { this._getQuestionList() }
          </View>
        </ScrollView>
      );
    }
  }

  _getQuestionList = () => {
    // return <QuestionList 
    //         questions={this.props.myQuestions} 
    //         isFetching={this.props.isFetchingMyQuestions}
    //         changeScene={this.props.changeScene} />
  }
}

const styles = StyleSheet.create({
});

const screenHeight = Math.round(Dimensions.get('window').height);

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: screenHeight > 750 ? '100%' : '95%',
    marginBottom: 20,
  },
});
