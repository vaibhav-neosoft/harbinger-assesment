import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnswerChoice from './AnswerChoice';

type Option = {
  id: number;
  text: string;
};

interface PollQuestionProps {
  questionId: number;
  questionText: string;
  questionType: string;  
  options: Option[];
  onVote: (questionId: number, answerId: number) => void;
}

const PollQuestion: React.FC<PollQuestionProps> = ({
  questionId,
  questionText,
  questionType,
  options,
  onVote,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const handleSelectOption = (optionId: number) => {
    setSelectedOptionId(optionId);
    if (questionType === 'yes-no' && optionId === 2) {
      onVote(questionId, optionId);
    } else {
      onVote(questionId, optionId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questionText}</Text>
      <AnswerChoice
        options={options}
        questionType={questionType}
        onSelect={handleSelectOption}
        selectedOptionId={selectedOptionId || undefined} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PollQuestion;
