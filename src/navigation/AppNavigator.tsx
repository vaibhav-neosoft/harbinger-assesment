import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PollDetail from '../screens/PollDetail';
import PollList from '../screens/PollList';
import FlowSelection from '../screens/FlowSelection';
import PollSummary from '../screens/PollSummary';
import DynamicForm from '../screens/DynamicForm';
import FormDetailScreen from '../screens/FormDetail';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
  <Stack.Navigator initialRouteName="FlowSelection"  screenOptions={{
    headerTintColor: '#1e847f', 
  }}>
    <Stack.Screen name="FlowSelection" component={FlowSelection} options={{ headerTitle: 'Home' }}   />
    <Stack.Screen name="PollList" component={PollList} options={{ headerTitle: 'Poll List' }} />
    <Stack.Screen name="PollDetail" component={PollDetail} options={{ headerTitle: 'Poll Detail' }}  />
    <Stack.Screen name="PollSummary" component={PollSummary}  options={{ headerTitle: 'Summary' }} />
    <Stack.Screen name="DynamicForm" component={DynamicForm}  options={{ headerTitle: 'Form' }} />
    <Stack.Screen name="FormDetail" component={FormDetailScreen}  options={{ headerTitle: 'Detail' }} />

  </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
