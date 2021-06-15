import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, TouchableHighlight } from "react-native";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { refreshScene } from "../../../modules/navigation/navigationActions.js";

import { MAP_UPDATE_WAIT, REGION_CHANGE_DEFINITION, DISTANT_CONVERSION } from "../../../constants/constants";

let timer = 0;

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            isMapReady: false
        };
    }
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
        onCalloutPress: PropTypes.func
    };

    componentDidMount() {
        // console.log('propss', this.props)
        // const { getUpdatedPosition } = this.props;
        // this.props.setCurrentRegion(this.props.currentRegion, true);
        // setTimeout(() => {
        //     const updatedRegion = getUpdatedPosition();
        //     navigator.geolocation.getCurrentPosition(
        //         (
        //             () => this._focusMap(updatedRegion, this.props.radius.radius))
        //         );
        // }, 2000);
    }

    componentDidUpdate(prevPros) {
        const { nav, radius, getUpdatedPosition, markers } = this.props;
        const { isMapReady } = this.state;
        // const updatedRegion = getUpdatedPosition();
        const currentPath = nav.routes["0"].routes[1].routes["0"].index;
        const currentScreen = nav.routes["0"].routes[1].routes["0"].routes[currentPath].key;

        this.props.setCurrentRegion(this.props.currentRegion, true);
        // setTimeout(() => {
        //     const updatedRegion = getUpdatedPosition();
        //     navigator.geolocation.getCurrentPosition(
        //         (
        //             () => this._focusMap(updatedRegion, this.props.radius.radius)),
        //             () => navigator.geolocation.requestAuthorization()
        //         );
        // }, 2000);

        if (
            (isMapReady && markers.length !== prevPros.markers.length) ||
            radius.radius !== prevPros.radius.radius
        ) {
            console.log("radiusss");
            this._focusMap(getUpdatedPosition(), radius.radius);
            return true;
        } else if (currentScreen !== "home" && this.state.focus && isMapReady) {
            console.log("nothome");
            this.setState({ focus: false });
            return true;
        } else if (currentScreen === "home" && !this.state.focus && isMapReady) {
            console.log("home");
            this.setState({ focus: true });
            this._onRegionChange(getUpdatedPosition(), radius.radius);
            this._focusMap(getUpdatedPosition(), radius.radius);
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { useGoogleMaps, region, setCurrentRegion, markers } = this.props;
        return (
            <View style={styles.container}>
                <MapView
                    provider={useGoogleMaps ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                    ref={ref => (this.map = ref)}
                    style={styles.map}
                    initialRegion={region}
                    onRegionChange={setCurrentRegion}
                    showsUserLocation={true}
                    onMapReady={this.onMapReady}
                >
                    {markers.map(marker => (
                        Platform.OS === 'ios' ?
                        <MapView.Marker
                            key={marker.id}
                            identifier={marker.id}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                        >
                            <MapView.Callout onPress={e => this._gotoDetails(e, marker)}>
                                <View>
                                    <Text style={{fontWeight:'bold'}}>{marker.title}</Text>
                                    <Text>{marker.description}</Text>
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                        :
                        <MapView.Marker
                            key={marker.id}
                            identifier={marker.id}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            title={marker.title}
                            description={marker.description}
                            onCalloutPress={e => this._gotoDetails(e, marker)}
                        />
                    ))}
                </MapView>
            </View>
        );
    }
    onMapReady = () => {
        this.setState({ isMapReady: true });
    };

    _gotoDetails = (e, marker) => {
        const { getItem, changeScene, onCalloutPress, isMarketplace, isGotoDetailsEnabled } = this.props;

        e.stopPropagation();
        // check if details enabled
        if (isGotoDetailsEnabled) {
            // check if array
            if (!isMarketplace) {
                onCalloutPress(marker.id);
            } else {
                getItem(marker.id).then(item => {
                    // const marketType = item && item.type;

                    changeScene("viewPost", {
                        // marketType,
                        item
                    });
                });
            }
        }
    };

    _onRegionChange = region => {
        const { savedRegion } = this.props;
        const isLatitudeChanged = Math.abs(savedRegion.latitude - region.latitude) > REGION_CHANGE_DEFINITION,
            isLongitudeChanged = Math.abs(savedRegion.longitude - region.longitude) > REGION_CHANGE_DEFINITION;

        // check if region actually changed
        if (isLatitudeChanged || isLongitudeChanged) {
            console.log("region changed", region);
            this.props.onRegionChange(region);
            this.props.saveRegion(region);
        }
    };

    _onMarkersChange = (markers, region) => {
        const isMarkersChanged = JSON.stringify(this.props.markers) !== JSON.stringify(markers);

        if (isMarkersChanged) {
            console.log("markers changed", markers);
            this._focusMap(region);
        }
    };

    _focusMap = (region, radius) => {
        let coords = [];
        // check if we have region
        if (region && region.latitude && region.longitude) {
            coords = [
                {
                    latitude: region.latitude - DISTANT_CONVERSION * (radius / 2),
                    longitude: region.longitude
                },
                {
                    latitude: region.latitude + DISTANT_CONVERSION * (radius / 2),
                    longitude: region.longitude
                }
            ];

            if (this.map && coords) {
                this.map.fitToCoordinates(coords, false);
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
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});
