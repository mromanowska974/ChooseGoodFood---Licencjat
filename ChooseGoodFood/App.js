import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DishesList from './components/DishesList';
import DishCard from './components/DishCard';
import DishDetails from './components/DishDetails';
import ComparisonScreen from './components/ComparisonScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Przeglądarka dań" component={DishesList}/>
      <Tab.Screen name="Ulubione" component={DishesList}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={TabNavigator} options={{
                headerShown: false
              }}/>
          <Stack.Screen name='Details' component={DishDetails}/>
          <Stack.Screen name='AlternativeDetails' component={DishDetails}/>
          <Stack.Screen name='Comparison' component={ComparisonScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
