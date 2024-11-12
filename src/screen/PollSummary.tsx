import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { resetVotes } from '../store/pollSlice';
import { PieChart } from 'react-native-chart-kit';
import { RouteProp, useRoute } from '@react-navigation/native';
import pollData from '../assets/pollData.json';

type PollSummaryRouteProp = RouteProp<{ params: { pollId: number } }, 'params'>;

const PollSummary: React.FC = () => {
    const votes = useSelector((state: RootState) => state.poll.votes);
    const dispatch = useDispatch();
    const route = useRoute<PollSummaryRouteProp>();
    const pollId = route.params.pollId;

    const getQuestionText = (pollId: number, questionId: number) => {
        const poll = pollData.find(p => p.id === pollId);
        if (!poll) return "Poll not found";

        const question = poll.questions.find(q => q.id === questionId);
        if (!question) return "Question not found";

        return question.text;
    };

    const getAnswerText = (pollId: number, questionId: number, answerId: number) => {
        const poll = pollData.find(p => p.id === pollId);
        if (!poll) return "Poll not found";

        const question = poll.questions.find(q => q.id === questionId);
        if (!question) return "Question not found";

        const answer = question.options.find(option => option.id === answerId);
        if (!answer) return "Answer not found";

        return answer.text;
    };


    const calculatePercentage = (questionVotes: Record<number, number>, answerId: number) => {
        const totalVotes = Object.values(questionVotes).reduce((sum, count) => sum + count, 0);
        return totalVotes > 0 ? ((questionVotes[answerId] || 0) / totalVotes) * 100 : 0;
    };

    const preparePieChartData = (questionId: string, questionVotes: Record<number, number>) => {
        const totalVotes = Object.values(questionVotes).reduce((sum, count) => sum + count, 0);
        return Object.entries(questionVotes).map(([answerId, count]) => ({
            name: getAnswerText(pollId, parseInt(questionId), parseInt(answerId)),
            population: ((count / totalVotes) * 100) || 0,
            color: getRandomColor(),
            legendFontColor: "#000",
            legendFontSize: 12,
        }));
    };

    const getRandomColor = () => {
        const colors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const renderVoteSummary = () => {
        const filteredVotes = pollId === 0 ? votes : { [pollId]: votes[pollId] };

        if (!filteredVotes) return null

        return Object.entries(filteredVotes).map(([pollId, pollQuestions]) => (
            <View key={pollId} style={styles.pollContainer}>
                <Text style={styles.pollTitle}>Poll {pollId}</Text>
                {pollQuestions && Object.entries(pollQuestions).map(([questionId, questionVotes]) => (
                    <View key={questionId} style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>{getQuestionText(parseInt(pollId), parseInt(questionId))}</Text>
                        <PieChart
                            data={preparePieChartData(questionId, questionVotes)}
                            width={Dimensions.get('window').width}
                            height={100}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft='-50'
                            style={styles.chartStyle}

                        />
                        {Object.entries(questionVotes).map(([answerId, count]) => (
                            <View key={answerId} style={styles.answerContainer}>
                                <Text>{getAnswerText(parseInt(pollId), parseInt(questionId), parseInt(answerId))}: {count} votes</Text>
                                <View style={styles.progressBarContainer}>
                                    <View
                                        style={[styles.progressBar, { width: `${calculatePercentage(questionVotes, Number(answerId))}%` }]}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.successText}>Poll Submitted Succesfully</Text>
                <Text style={styles.title}>Poll Summary</Text>
                {renderVoteSummary()}
                <Button title="Reset Poll Data" onPress={() => dispatch(resetVotes(pollId))} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, paddingBottom: 100, backgroundColor: 'white' },
    successText: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#1e847f', textAlign: 'center', marginTop: 16 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    pollContainer: { marginBottom: 15 },
    pollTitle: { fontSize: 20, fontWeight: 'bold' },
    questionContainer: { marginVertical: 10 },
    questionTitle: { fontSize: 18, fontWeight: 'bold' },
    answerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    progressBarContainer: { flex: 1, height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, marginLeft: 10 },
    progressBar: { height: 10, backgroundColor: '#3b5998', borderRadius: 5 },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default PollSummary;
