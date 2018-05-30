import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

import {
    MAP_UPDATE_WAIT,
    REGION_CHANGE_DEFINITION,
    DISTANT_CONVERSION,
} from '../../../constants/constants';
import { SCENES } from '../../../routes';

let timer = 0;

export default class Map extends React.Component {
    static propTypes = {
        // internal
        useGoogleMaps: PropTypes.bool.isRequired,
        region: PropTypes.object,
        savedRegion: PropTypes.object,
        item: PropTypes.object,
        snapshotUri: PropTypes.string,
        setCurrentRegion: PropTypes.func.isRequired,
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

    componentDidMount() {
        this.props.setCurrentRegion(this.props.currentRegion, true);
    }

    componentWillReceiveProps(nextProps) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            this._onRegionChange(nextProps.region);
            this._focusMap(nextProps.region);
        }, MAP_UPDATE_WAIT);
    }

    componentWillUnmount() {
        clearTimeout(timer);
    }

    render() {
        const { useGoogleMaps, region, setCurrentRegion, markers } = this.props;
        return (
            <View style={styles.container}>
                <MapView
                    provider={useGoogleMaps ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                    ref={ref => (this.map = ref)}
                    style={styles.map}
                    region={region}
                    onRegionChange={setCurrentRegion}
                    showsUserLocation={true}
                >
                    {markers.map(marker => (
                        <MapView.Marker
                            key={marker.id}
                            identifier={marker.id}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                            description={marker.description}
                            onCalloutPress={e => this._gotoDetails(e, marker)}
                        />
                    ))}
                </MapView>
            </View>
        );
    }

    _gotoDetails = (e, marker) => {
        const {
            getItem,
            changeScene,
            onCalloutPress,
            isMarketplace,
            isGotoDetailsEnabled,
        } = this.props;

        e.stopPropagation();
        // check if details enabled
        if (isGotoDetailsEnabled) {
            // check if array
            if (!isMarketplace) {
                onCalloutPress(marker.id);
            } else {
                getItem(marker.id).then(item => {
                    const marketType = item && item.type;

                    changeScene(SCENES.viewPost.key, {
                        navigationParams: {
                            marketType,
                            item,
                        },
                    });
                });
            }
        }
    };

    _onRegionChange = region => {
        const { savedRegion } = this.props;
        const isLatitudeChanged =
                Math.abs(savedRegion.latitude - region.latitude) > REGION_CHANGE_DEFINITION,
            isLongitudeChanged =
                Math.abs(savedRegion.longitude - region.longitude) > REGION_CHANGE_DEFINITION;

        // check if region actually changed
        if (isLatitudeChanged || isLongitudeChanged) {
            console.log('region changed', region);
            this.props.onRegionChange(region);
            this.props.saveRegion(region);
        }
    };

    _focusMap = region => {
        const { radius } = this.props.radius;
        let coords = [];

        // check if we have region
        if (region && region.latitude && region.longitude) {
            coords = [
                {
                    latitude: region.latitude - DISTANT_CONVERSION * (radius / 2),
                    longitude: region.longitude,
                },
                {
                    latitude: region.latitude + DISTANT_CONVERSION * (radius / 2),
                    longitude: region.longitude,
                },
            ];

            if (this.map) {
                this.map.fitToCoordinates(coords, false);
                // this.props.onMapFocus(radius);
            }
        }
    };

    /*
  _focusCenter = () => {
    const {markers, setMapApi} = this.props;
    const ids = this.props.markers.map((m) => m.id);
    const mapApi = this.map;

    // check if we have the api
    if(mapApi) {
      mapApi.fitToSuppliedMarkers(ids, false);
      this.props.setMapApi(mapApi);
    }
  };
  */
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
