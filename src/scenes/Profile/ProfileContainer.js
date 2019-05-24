import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components
import SaveButtonContainer from './SaveButtonContainer';
import CancelButtonContainer from './CancelButtonContainer';
import Profile from './components/Profile';
import Form from './components/Form';
import {SpinnerOverlay} from '../../components'
import NavBar from '../../modules/navigation/components/NavBar';

// actions
import {
  getProfile, 
  toggleEditMode, 
  changeFormValue,
  uploadImage,
} from './profileActions';

// module actions
import {
  getMyStats, 
  updateMyProfile, 
  removeAccount
} from '../../modules/me/meActions';

// styles
import commonStyles from '../../styles/common';

// i18n
import {t} from '../../i18n';
import dictionary from './dictionary';

class ProfileContainer extends Component {
  static propTypes = {
    isFetchingProfile: PropTypes.bool.isRequired,
    isEditable: PropTypes.bool.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    user: PropTypes.object,
    form: PropTypes.object.isRequired,
    imageUpload: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
    changeFormValue: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    isUpdatingMyProfile: PropTypes.bool.isRequired,
    updateMyProfile: PropTypes.func.isRequired,
  };

  // static renderNavi
  static navigationOptions = ({ navigation }) => {
    const navKey = navigation.state.key;

    return {
      headerTitle: (
          <NavBar
              title={t(dictionary.profile)}
              leftButton={<CancelButtonContainer navKey={navKey} />} 
              rightButton={<SaveButtonContainer />} 
          />
      ),
      headerLeft: null
    };
  };

  componentDidMount() {
    this.props.getProfile(this.props.userId)
    this.props.getMyStats();
  }

  render() {
    const {
      user, 
      form, 
      isEditable,
      isEditMode,
      isUpdatingMyProfile,
      updateMyProfile,
      isFetchingProfile,
      toggleEditMode,
      changeFormValue,
      removeAccount, 
      uploadImage, 
    } = this.props;

    if (!user || isFetchingProfile) {
      return <SpinnerOverlay show={true} />
    }
    // check if edit mode
    if(isEditMode) {
      return <Form 
        user={user}
        form={form}
        isUpdatingMyProfile={isUpdatingMyProfile}
        updateMyProfile={updateMyProfile}
        changeFormValue={changeFormValue}
        removeAccount={removeAccount}
      />
    }
    else {
      return <Profile 
        user={user}
        isEditable={isEditable}
        isUpdatingMyProfile={isUpdatingMyProfile}
        toggleEditMode={toggleEditMode}
        uploadImage={uploadImage}
      />
    }
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.profileScene,

    // module states
    isUpdatingMyProfile: state.me.isUpdatingMyProfile,
    imageUpload: {
      ...state.app.imageUpload,
    },
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    getProfile,
    toggleEditMode,
    changeFormValue,

    // module actions
    updateMyProfile,
    getMyStats,
    removeAccount,
    uploadImage,
  }
)(ProfileContainer);
