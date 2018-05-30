import React, {PropTypes, Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {SpinnerOverlay} from '../../components';
import CreateQuestion from './components/CreateQuestion';
import ChooseCategory from './components/ChooseCategory';
import SubmitPostButton from '../../components/SubmitPostButton';
import {onMessage} from '../../modules/app/appActions.js';
import {changeScene} from '../../modules/navigation/navigationActions.js';
import {back} from '../../modules/navigation/navigationActions.js';
import {
  clearLocation,
} from '../../modules/currentLocation/currentLocationActions.js';
import {
  setQuestionCategoryId,
  changeFormValue,
  createQuestion,
  setPosition,
  setAddress,
  cancelQuestion,
} from './createQuestionActions.js';
import commonStyles from '../../styles/common';
import * as colors from '../../styles/colors';
import {t} from '../../i18n';
import dictionary from './dictionary';
import Geocoder from 'react-native-geocoder';

class CreateQuestionContainer extends Component {
  static propTypes = {
    isCreatingQuestion: PropTypes.bool.isRequired,
    categoryId: PropTypes.string,
    back: PropTypes.func.isRequired,
    changeFormValue: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
    createQuestion: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setAddress: PropTypes.func.isRequired,
    cancelQuestion: PropTypes.func.isRequired,
    position: PropTypes.object,
  };

  componentWillReceiveProps() {
    this.props.clearLocation();
  }

  render() {
    const themeColor = colors.PURPLE;
    const {
      categoryId, 
      back, 
      setQuestionCategoryId, 
      changeFormValue, 
      changeScene,
      form, 
      setAddress, 
      cancelQuestion, 
      isCreatingQuestion,
      currentAddress, 
    } = this.props;
    const isFormCompleted = form.question &&
                            form.address;

    if (!categoryId) {
      return (
        <ChooseCategory
          changePrevScene={back}
          setQuestionCategoryId={setQuestionCategoryId}
        />
      );
    }
    // check if we have current address
    if(currentAddress) {
      form.address = currentAddress;
    }

    return (
      <View style={commonStyles.fullScreen}>
        <CreateQuestion 
          themeColor={themeColor}
          changeFormValue={changeFormValue}
          changeScene={changeScene}
          form={form}
          getGeocodeData={this._getGeocodeData}
          setAddress={setAddress}
          cancelQuestion={cancelQuestion}
          categoryId={categoryId}
        />
        {
          isFormCompleted
          ? <SubmitPostButton
              disabled={isCreatingQuestion} 
              buttonColor={themeColor}
              onPress={this._submit} 
            />
          : null
        }
      </View>
    );
  }

  _submit = () => {
    const {form, setAddress, setPosition, createQuestion} = this.props;

    // check if we have address
    if(form.address) {
      // get data
      this._getGeocodeData(form.address, (data) => {
        // change existing address or address value
        setAddress(data.formattedAddress);
        // set position
        setPosition(data.position);
        // create
        createQuestion();
      });
    }
    else {
      // prompt user that address is required
      this._displayMessage('locationFieldRequired');
    }
  };

  _getGeocodeData= (address, callback) => {
    const {setAddress} = this.props;

    // run geo coding
    Geocoder.geocodeAddress(address).then((data) => {
      let isPositionAvailable = data && 
                                data.length && 
                                data[0].formattedAddress && 
                                data[0].position && 
                                data[0].position.lat && 
                                data[0].position.lng;

      // check if we have position
      if(isPositionAvailable) {
        // proceed
        callback(data[0]);
      }
      else {
        // reset field
        setAddress('');
        // prompt user that address is not available
        this._displayMessage('locationInvalid');
      }
    }).catch((err) => {
      console.log(err)
      // reset field
      setAddress('');
      // prompt user that address is not available
      this._displayMessage('locationInvalid');
    });
  };

  _displayMessage = (id) => {
    this.props.onMessage(t(dictionary[id]));
  };
}

function mapStateToProps(state) {
  return {
    ...state.createQuestionScene,
    currentAddress: state.currentLocation.address,
    me: state.me.me,
  };
}

export default connect(
  mapStateToProps,
  {
    back,
    setQuestionCategoryId,
    changeFormValue,
    changeScene,
    createQuestion,
    setPosition,
    setAddress,
    cancelQuestion,
    onMessage,
    clearLocation,
  }
)(CreateQuestionContainer);
