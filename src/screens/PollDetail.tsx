import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import { submitVote } from '../store/pollSlice';
import PollQuestion from '../components/PollQuestion';
import pollData from '../assets/pollData.json';

type PollDetailRouteProp = RouteProp<{ params: { pollId: number } }, 'params'>;

const PollDetail: React.FC = () => {
  const route = useRoute<PollDetailRouteProp>();
  const pollId = route.params.pollId;
  const poll = pollData.find((p) => p.id === pollId);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [responses, setResponses] = useState<{ [key: number]: number | null }>({});
  const [error, setError] = useState<string | null>(null);

  const handleVote = (questionId: number, answerId: number, questionType: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: answerId }));
    dispatch(submitVote({ pollId, questionId, answerId }));
    setError(null);

    if (questionType === 'yes-no' && answerId==2) {
      setShowAllQuestions(false);
    }
    else {
      setShowAllQuestions(true);
    }
  };

  const handleSubmitPoll = () => {
    const unansweredQuestions = poll.questions.filter((q) => !(q.id in responses));
    if (unansweredQuestions.length > 0 && showAllQuestions) {
      setError("Please answer all questions before submitting.");
    } else {
      if (unansweredQuestions.length == poll.questions.length) {
        setError("Please answer all questions before submitting.");
      }
      else {
        setError(null);
        navigateToPollSummary(pollId);
      }
    }
  };

  const navigateToPollSummary = (pollId: number) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'FlowSelection' },
          { name: 'PollSummary', params: { pollId: pollId } },
        ],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{poll.title}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={showAllQuestions ? poll.questions : [poll.questions[0]]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PollQuestion
            questionId={item.id}
            questionText={item.text}
            questionType={item.type}
            options={item.options}
            onVote={(qId, answerId) => handleVote(item.id, answerId, item.type)}
          />
        )}
      />
      <Pressable style={styles.buttonStyle} onPress={handleSubmitPoll}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Submit Vote</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: 'white' },
  buttonStyle: { paddingHorizontal: 40, borderRadius: 4, paddingVertical: 14, backgroundColor: '#1e847f', alignSelf: 'center', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  errorText: { color: 'red', marginBottom: 10 },
});

export default PollDetail;
