import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FormField } from '../screens/types';
import { RootState } from '../store';
import { updateField } from '../store/formSlice';

interface MultiSelectProps {
  field: FormField;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ field }) => {
  const dispatch = useDispatch();
  const selectedValues = useSelector((state: RootState) => state.form.formData[field.id] || []);

  const handleToggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((item: string) => item !== value)
      : [...selectedValues, value];

    dispatch(updateField({ id: field.id, value: newValues }));
  };

  return (
    <View style={styles.container}>
      {field.options?.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.option,
            selectedValues.includes(option.value) && styles.selectedOption,
          ]}
          onPress={() => handleToggleOption(option.value)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultiSelect;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap' },
  option: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#ecc19c', 
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});
