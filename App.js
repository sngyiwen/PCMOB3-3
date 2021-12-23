import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NotesScreen from './screens/NotesScreen'
import AddScreen from './screens/AddScreen'
import NotesStack from './screens/NotesStack'

// import * as SQLite from "expo-sqlite";
// const db = SQLite.openDatabase("notes.db");

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen
          name="Notes Stack"
          component={NotesStack}
          options={{ headerShown: false }}
            // headerTitle: "Notes App",
            // headerTitleStyle: {
            //   fontWeight: "bold",
            //   fontSize: 30,
            // },
            // headerStyle: {
            //   height: 120,
            //   backgroundColor: "yellow",
            //   borderBottomColor: "#ccc",
            //   borderBottomWidth: 1,
            // },
          // }}
        />
        <Stack.Screen name="Add Note" component={AddScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});
//run
