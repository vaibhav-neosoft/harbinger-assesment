import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateField, submitForm, resetForm } from '../store/formSlice';
import { Dropdown } from 'react-native-element-dropdown';
import MultiSelect from '../components/MultiSelect';
import { CommonActions, useNavigation } from '@react-navigation/native';

const DynamicForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const formData = useSelector((state: RootState) => state.form.formData);
    const fields = formData?.fields;
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        dispatch(resetForm());
    }, [])


    const handleChange = (id: string, value: any) => {
        dispatch(updateField({ id, value }));
        setErrors((prevErrors) => ({ ...prevErrors, [id]: undefined }));
    };

    const handleSubmit = () => {
        let hasErrors = false;
        let newErrors: any = {};

        fields.forEach((field) => {
            const value = formData[field.id];
            const rules = field.validation || {};

            if (rules.required && !value) {
                newErrors[field.id] = 'This field is required.';
                hasErrors = true;
            } else if (rules.minLength && value.length < rules.minLength) {
                newErrors[field.id] = `Minimum length is ${rules.minLength} characters.`;
                hasErrors = true;
            } else if (rules.maxLength && value.length > rules.maxLength) {
                newErrors[field.id] = `Maximum length is ${rules.maxLength} characters.`;
                hasErrors = true;
            } else if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
                newErrors[field.id] = 'Invalid format.';
                hasErrors = true;
            }
        });

        if (hasErrors) {
            setErrors(newErrors);
        } else {
            dispatch(submitForm());
            Alert.alert('Form Submitted', 'Form data has been successfully submitted.');
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'FlowSelection' },
                        { name: 'FormDetail' },
                    ],
                })
            );
        }
    };


    return (
        <View style={styles.container}>
            {fields.map((field) => (
                <View key={field.id} style={styles.fieldContainer}>
                    <Text style={styles.label}>{field.label}</Text>
                    {field.fieldType === 'text' || field.fieldType === 'email' ? (
                        <TextInput
                            style={styles.input}
                            placeholder={field.placeholder}
                            keyboardType={field.fieldType === 'email' ? 'email-address' : 'default'}
                            value={formData[field.id] || ''}
                            onChangeText={(value) => handleChange(field.id, value)}
                        />
                    ) : field.fieldType === 'dropdown' || field.fieldType === 'singleSelect' ? (
                        <Dropdown
                            value={formData[field.id] || null}
                            onChange={(item) => handleChange(field.id, item.value)}
                            data={field.options?.map(option => ({
                                label: option.label,
                                value: option.label
                            }))}
                            labelField="label"
                            valueField="value"
                            placeholder="Select an option"
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                        />
                    ) : field.fieldType === 'multiSelect' ? (
                        <MultiSelect field={field} onChange={(value) => handleChange(field.id, value)} />
                    ) : null}
                    {errors && errors[field.id] && <Text style={styles.errorText}>{errors[field.id]}</Text>}
                </View>
            ))}

            <Pressable style={styles.buttonStyle} onPress={handleSubmit}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Submit Form</Text>
            </Pressable>
        </View>
    );
};

export default DynamicForm;

const styles = {
    container: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1
    },
    buttonStyle: { paddingHorizontal: 40, borderRadius: 4, paddingVertical: 14, backgroundColor: '#1e847f', alignSelf: 'center', marginTop: 12 },
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    dropdown: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#aaa',
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    dropdownContainer: {
        marginTop: 5,
        width: '100%',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
};