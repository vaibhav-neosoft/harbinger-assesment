import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Option = {
  id: number;
  text: string;
};

interface AnswerChoiceProps {
  options: Option[];
  questionType: string;  
  onSelect: (optionId: number) => void;
  selectedOptionId?: number; 
}

const AnswerChoice: React.FC<AnswerChoiceProps> = ({ options, questionType, onSelect, selectedOptionId }) => {
  return (
    <View style={styles.optionsContainer}>
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={[
              styles.optionButton,
              {
                backgroundColor: selectedOptionId === option.id ? '#1e847f40' : 'transparent', 
              }
            ]}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    borderColor: '#DCDCDC',
    backgroundColor: 'transparent',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AnswerChoice;
