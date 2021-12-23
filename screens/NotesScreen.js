import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
// import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ route, navigation }) {
  const [notes, setNotes] = useState([
    // { title: "Walk the cat", done: false, id: "0" },
    // { title: "Feed the elephant", done: false, id: "1" },
  ]);
  
function refreshNotes(){
  db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log("Error" , error)
      );
    });
}


  // Monitor route.params for changes and add items to the database
  useEffect (() => {
    if (route.params?.text){
      db.transaction(
        (tx)=>{
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0,?)",[
            route.params.text,
          ]);
      },
      null,
      refreshNotes
      );
    }
  }, [route.params?.text]);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Entypo
            name="documents"
            size={24}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (route.params?.text) {
      const newNote = {
        title: route.params.text,
        done: false,
        id: notes.length.toString(),
      };
      setNotes([...notes, newNote]);
    }
  }, [route.params?.text]);

  // This function deletes an individual note
  function deleteNote(id) {
    console.log("Deleting " + id);
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
      },
      null,
      refreshNotes
    );
  }

  function addNote() {
    navigation.navigate("Add Note");
    // let newNote = {
    //   title: "Sample new note",
    //   done: false,
    //   id: notes.length.toString(),
    // };
    // setNotes([...notes, newNote]);
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifycontent: "space-between",
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
        <TouchableOpacity onPress={()=> deleteNote(item.id)}>
        <Entypo
            name="trash"
            size={24}
            color="black"
            style={{ marginLeft: 20 }}
          />

        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
      />
    </View>
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
//first push
