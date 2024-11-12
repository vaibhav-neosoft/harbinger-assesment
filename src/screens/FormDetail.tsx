import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const FormDetailScreen: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form.formData);
  const fields = formData?.fields;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Form Details</Text>
      {fields?.map((field) => (
        <View key={field.id} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          {field.fieldType === 'text' || field.fieldType === 'email' ? (
            <Text style={styles.value}>{formData[field.id] || 'N/A'}</Text>
          ) : field.fieldType === 'dropdown' || field.fieldType === 'singleSelect' ? (
            <Text style={styles.value}>{formData[field.id] || 'N/A'}</Text>
          ) : field.fieldType === 'multiSelect' ? (
            <Text style={styles.value}>
              {formData[field.id]?.map((option: any) => option).join(', ') || 'N/A'}
            </Text>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1,
    backgroundColor:'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default FormDetailScreen;
