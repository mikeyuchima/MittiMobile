import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { SpinnerOverlay } from '../../components';
import CreatePost from './components/CreatePost';
import SubmitPostButton from '../../components/SubmitPostButton';
import { uploadImage, removeImage, onMessage } from '../../modules/app/appActions.js';
import { clearLocation } from '../../modules/currentLocation/currentLocationActions.js';
import {
    changeFormValue,
    createPost,
    cancelPost,
    setType,
    getGeocodeData,
} from './createPostActions.js';
import commonStyles from '../../styles/common';
import * as colors from '../../styles/colors';
import { t } from '../../i18n';
import dictionary from './dictionary';

class CreatePostContainer extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        imageUpload: PropTypes.object.isRequired,
        isCreatingPost: PropTypes.bool.isRequired,
        isGettingGeocodeData: PropTypes.bool.isRequired,
        changeFormValue: PropTypes.func.isRequired,
        uploadImage: PropTypes.func.isRequired,
        removeImage: PropTypes.func.isRequired,
        createPost: PropTypes.func.isRequired,
        cancelPost: PropTypes.func.isRequired,
        getGeocodeData: PropTypes.func.isRequired,
        position: PropTypes.object,
    };

    // static renderNavi
    static navigationOptions = { title: 'Welcome', header: { visible:false } };

    componentDidMount() {
        this.props.setType(this.props.navigation.getParam('postType'));
    }

    componentWillReceiveProps(nextProps) {
        // check current address
        if (nextProps.currentAddress != this.props.currentAddress) {
            this.props.clearLocation();
        }
    }

    render() {
        const themeColor = colors.GREEN;
        const {
            me,
            navigation,
            changeFormValue,
            getGeocodeData,
            uploadImage,
            removeImage,
            cancelPost,
            form,
            imageUpload,
            position,
            currentAddress,
            isCreatingPost,
            isGettingGeocodeData,
        } = this.props;
        const isFormCompleted = form.title && form.description && form.condition && form.address;

        // check if we have post type
        if (!navigation.getParam('postType')) {
            return null;
        }
        if (isCreatingPost) {
            return <SpinnerOverlay show={true} />;
        }
        // check if we have current address
        if (currentAddress) {
            form.address = currentAddress;
        }

        return (
            <View style={commonStyles.fullScreen}>
                <CreatePost
                    me={me}
                    type={navigation.getParam('postType')}
                    themeColor={themeColor}
                    changeFormValue={changeFormValue}
                    uploadImage={uploadImage}
                    removeImage={removeImage}
                    cancelPost={cancelPost}
                    form={form}
                    imageUpload={imageUpload}
                    position={position}
                    getGeocodeData={getGeocodeData}
                />
                {isFormCompleted ? (
                    <SubmitPostButton
                        disabled={isCreatingPost}
                        buttonColor={themeColor}
                        onPress={this._submit}
                    />
                ) : null}
            </View>
        );
    }

    _submit = () => {
        const { form, createPost } = this.props;

        // check if we have address
        if (form.address) {
            // get data
            this.props.getGeocodeData(form.address, true);
        } else {
            // prompt user that address is required
            this._displayMessage('locationFieldRequired');
        }
    };

    _displayMessage = id => {
        this.props.onMessage(t(dictionary[id]));
    };
}

function mapStateToProps(state) {
    return {
        ...state.createPostScene,
        currentAddress: state.currentLocation.address,
        imageUpload: {
            ...state.app.imageUpload,
        },
        me: state.me.me,
    };
}

export default connect(mapStateToProps, {
    changeFormValue,
    getGeocodeData,
    removeImage,
    createPost,
    cancelPost,
    setType,
    uploadImage,
    onMessage,
    clearLocation,
})(CreatePostContainer);
