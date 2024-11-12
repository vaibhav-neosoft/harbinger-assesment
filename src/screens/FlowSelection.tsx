import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const options=[{
    id:1,
    title:'Dynamic Voting App',
    navigation:'PollList',
    color:'#1e847f'
},
{
    id:2,
    title:'Voting App Summary',
    navigation:'DynamicForm',
    color:'#1e847f'
},
{
    id:3,
    title:'Dynamic Form Builder',
    navigation:'DynamicForm',
    color:'#ecc19c'
},
{
    id:4,
    title:'Form Result',
    navigation:'FormDetail',
    color:'#ecc19c'
}
]

const FlowSelection: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigation=(item:any)=>{
    if(item.id==2){
        navigation.navigate('PollSummary', { pollId: 0 })
    }
    else{
        navigation.navigate(item.navigation)
    }
}

  const renderOptions = ({ item }) => (
    <TouchableOpacity onPress={() => handleNavigation(item)}>
      <View style={{ paddingHorizontal: 40,paddingVertical:16, borderRadius:4 ,backgroundColor:item.color,margin:10}}>
        <Text style={{ fontSize: 16,color:'white' ,fontWeight: 'bold',textAlign:'center' }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1,backgroundColor:'white',paddingTop:50,justifyContent:'center',alignItems:'center',height:'100%' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Select from the below option</Text>
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOptions}
      />
    </View>
  );
};

export default FlowSelection;
