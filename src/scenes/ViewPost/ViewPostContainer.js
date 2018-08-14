import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { SpinnerOverlay } from '../../components';
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';
import OptionButtonContainer from './OptionButtonContainer';
import ContactButtonContainer from './ContactButtonContainer';
import OptionDropdown from './components/OptionDropdown';
import ViewPost from './components/ViewPost';
import { changeScene } from '../../modules/navigation/navigationActions.js';
import { setItem, setCurrentImage, markCloseItem, deleteItem } from './viewPostActions.js';
import commonStyles from '../../styles/common';
import { t } from '../../i18n';
import dictionary from './dictionary';
import { POST_TYPES } from '../../constants/constants';

class ViewPostContainer extends Component {
    static propTypes = {
        changeScene: PropTypes.func.isRequired,
        setItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        setCurrentImage: PropTypes.func.isRequired,
        markCloseItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        isOptionDropdownOpen: PropTypes.bool.isRequired,
        currentImage: PropTypes.object,
    };

    // static renderNavi
    static navigationOptions = ({ navigation }) => {
        const item = navigation.getParam('item'),
              userId = navigation.getParam('userId'),
              themeColor = navigation.getParam('themeColor');
        const navKey = navigation.state.key;
        const marketType = item && item.type,
              creatorId = item && item.creator && item.creator.id;
        let translation = '',
            title = '';

        // check market type
        switch (marketType) {
            case POST_TYPES.free.id: {
                translation = t(dictionary.freeShare);
                break;
            }
            default: {
                translation = t(dictionary[marketType]);
            }
        }
        // get title
        title = (marketType && translation) || '';

        return {
        headerTitle: (
            <NavBar
                title={title.toUpperCase()}
                leftButton={<BackButtonContainer navKey={navKey} />}
                rightButton={
                    creatorId && userId && creatorId == userId ? (
                        <OptionButtonContainer />
                    ) : (
                        <ContactButtonContainer
                            item={item}
                            marketType={marketType}
                            themeColor={themeColor}
                        />
                    )
                }
            />
        ),
        headerLeft: null
        };
    };

    componentDidMount() {
        const item = this.props.navigation.getParam('item');
        const {themeColor, me} = this.props;

        this.props.setItem(item);
        this.props.navigation.setParams({
            item,
            userId: me.id,
            themeColor,
        });
    }

    render() {
        const {
            me,
            navigation,
            changeScene,
            setCurrentImage,
            currentImage,
            markCloseItem,
            deleteItem,
            isOptionDropdownOpen,
            themeColor,
        } = this.props;
        const item = navigation.getParam('item');

        // check if we have market type
        // if (!navigation.getParam('marketType')) {
        //     return null;
        // }
        if (!me) {
            return <SpinnerOverlay show={true} />;
        }

        return (
            <View style={commonStyles.fullScreen}>
                <ViewPost
                    me={me}
                    themeColor={themeColor}
                    changeScene={changeScene}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                    item={item}
                />
                <OptionDropdown
                    onMarkClose={markCloseItem}
                    onDelete={deleteItem}
                    isOptionDropdownOpen={isOptionDropdownOpen}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.viewPostScene,
        me: state.me.me,
    };
}

export default connect(mapStateToProps, {
    changeScene,
    setItem,
    setCurrentImage,
    markCloseItem,
    deleteItem,
})(ViewPostContainer);
