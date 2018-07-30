import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spinner } from '../../../components';

// styles
import mittiStyles from '../../../styles/mitti';
import commonStyles from '../../../styles/common';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';



export default class QuestionList extends Component {
    static propTypes = {
        questions: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        changeScene: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View>
                <View style={styles.title}>
                    <Text style={mittiStyles.darkFont}>{t(dictionary.myQuestions)}</Text>
                </View>
                <View style={styles.myQuestionContainer}>
                    {this.props.questions.map(q => (
                        <Question key={q._id} changeScene={this.props.changeScene} question={q} />
                    ))}
                    {this.props.isFetching && (
                        <View style={commonStyles.centeredChilds}>
                            <Spinner />
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const Question = ({ question, changeScene }) => {
    const params = {
        questionId: question._id,
    };

    return (
        <TouchableOpacity
            onPress={() => changeScene('community', params)}
            style={styles.itemContainer}
        >
            <View style={styles.rowContainer}>
                <View style={[styles.rowContent]}>
                    <View style={styles.questionIconContainer}>
                        <MCIIcon
                            style={[styles.questionIcon, mittiStyles.darkFont]}
                            size={40}
                            name={'comment-question-outline'}
                        />
                    </View>
                    <View style={styles.questionContainer}>
                        <Text style={styles.text}>{question.question}</Text>
                    </View>
                </View>
            </View>

            {question.answers.length > 0 && (
                <View style={styles.rowContainer}>
                    <View style={styles.rowContent}>
                        <View style={styles.answerIconContainer}>
                            <MCIIcon style={styles.answerIcon} size={28} name={'comment-check'} />
                        </View>
                        <View style={styles.answerContainer}>
                            <Text style={styles.text}>
                                {question.answers[question.answers.length - 1].answer}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        marginBottom: 20,
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row',
    },
    myQuestionContainer: {
        marginBottom: 20,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    rowContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    questionIconContainer: {
        width: 50,
        marginRight: 10,
    },
    questionIcon: {
        flex: 1,
    },
    questionContainer: {
        flex: 1,
    },
    answerIconContainer: {
        width: 50,
        marginRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    answerIcon: {
        color: '#CA35EF',
    },
    answerContainer: {
        flex: 1,
        backgroundColor: '#121418',
        padding: 10,
        marginBottom: 10,
    },
    text: {
        color: '#FFFFFF',
    },
});
