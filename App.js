import React from 'react';
import { StyleSheet } from 'react-native';
import { Movie } from "./Components/MovieScreen"
import { MainScreen } from "./Components/MainScreen"
import { Photo } from "./Components/Photo"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calendar" component={MainScreen} />
        <Stack.Screen name="SUPER FILM" component={Movie} />
        <Stack.Screen name="Original" component={Photo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
