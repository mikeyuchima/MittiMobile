import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  Platform
} from 'react-native';
import {connect} from 'react-redux';

// components
import Map from './components/Map';

// actions
import {
  setCurrentRegion,
  saveRegion,
  onMapFocus,
  setMapApi,
  getUpdatedPosition
} from './mapActions';
import {changeScene} from '../navigation/navigationActions.js';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

class MapContainer extends React.Component {
  static propTypes = {
    // internal
    useGoogleMaps: PropTypes.bool.isRequired,
    isRegionChanged: PropTypes.bool.isRequired,
    region: PropTypes.object,
    savedRegion: PropTypes.object,
    item: PropTypes.object,
    snapshotUri: PropTypes.string,
    setCurrentRegion: PropTypes.func.isRequired,
    getUpdatedPosition: PropTypes.func.isRequired,
    saveRegion: PropTypes.func.isRequired,
    onMapFocus: PropTypes.func.isRequired,
    setMapApi: PropTypes.func.isRequired,
    changeScene: PropTypes.func,
    radius: PropTypes.object,
    savedRadius: PropTypes.number.isRequired,
    // external
    isMarketplace: PropTypes.bool.isRequired,
    isGotoDetailsEnabled: PropTypes.bool.isRequired,
    markers: PropTypes.array,
    getItem: PropTypes.func,
    onRegionChange: PropTypes.func,
    onCalloutPress: PropTypes.func,
  };

  static defaultProps = {
    useGoogleMaps: true,
    isMarketplace: true,
    isGotoDetailsEnabled: true,
    markers: [],
    onRegionChange: () => {},
    onCalloutPress: () => {},
  }

  render() {
    const {
      isMarketplace,
      isGotoDetailsEnabled,
      isRegionChanged,
      useGoogleMaps,
      markers,
      region,
      currentRegion,
      savedRegion,
      radius,
      savedRadius,
      snapshotUri,
      setCurrentRegion,
      saveRegion,
      onMapFocus,
      setMapApi,
      item,
      getItem,
      changeScene,
      onRegionChange,
      onCalloutPress,
      nav,
      getUpdatedPosition,
    } = this.props;

    return (
      <Map 
        isMarketplace={isMarketplace}
        isGotoDetailsEnabled={isGotoDetailsEnabled}
        isRegionChanged={isRegionChanged}
        useGoogleMaps={useGoogleMaps}
        markers={markers}
        currentRegion={currentRegion}
        region={region}
        savedRegion={savedRegion}
        radius={radius}
        savedRadius={savedRadius}
        setCurrentRegion={setCurrentRegion}
        saveRegion={saveRegion}
        onMapFocus={onMapFocus}
        setMapApi={setMapApi}
        snapshotUri={snapshotUri}
        item={item}
        getItem={getItem}
        changeScene={changeScene}
        onRegionChange={onRegionChange}
        onCalloutPress={onCalloutPress}
        nav={nav}
        getUpdatedPosition={getUpdatedPosition}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.map,
    radius: state.radius,
    nav: state.nav,

  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    setCurrentRegion,
    saveRegion,
    onMapFocus,
    setMapApi,
    changeScene,
    getUpdatedPosition,
  }
)(MapContainer);
