import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import pollData from '../assets/pollData.json';
import { RootState } from '../store';

const PollList: React.FC = () => {
    const navigation = useNavigation();
    const polls = pollData;
    const userResponses = useSelector((state: RootState) => state.poll);
    console.log(userResponses)
    const renderPollItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('PollDetail', { pollId: item.id })}>
            <View style={{ padding: 12, borderWidth: 0.5, margin: 5, borderRadius: 4, borderColor: '#ecc19c' }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 20, marginVertical: 10 }}>Select the poll below</Text>
            <FlatList
                data={polls}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPollItem}
            />
        </View>
    );
};

export default PollList;
