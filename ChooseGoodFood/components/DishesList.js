import { Button, StyleSheet, Text, TextInput, View, FlatList, Platform } from 'react-native';
import { useState } from 'react';
import DishCard from './DishCard';

export default function DishesList() {
    const [dishesList, setDishesList] = useState([
        1,2,3,4,5
    ]);

    return (
      <View>
        <View style={styles.searchBarRow}>
            <TextInput style={styles.searchBar} placeholder='Szukaj...'/>
            <View style={styles.button}>
              <Button title='Sortuj'/>
            </View>
            <View style={styles.button}>
              <Button title='Filtruj'/>
            </View>
        </View>
        <FlatList 
            data={dishesList}
            renderItem={dish => {
              return (
                <DishCard/>
              );
            }}
            keyExtractor={(item, index) => {
              return index;
            }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  searchBarRow: {
    flexDirection: 'row',
    marginHorizontal: Platform.select({
        ios: 15,
        android: 25
    }),
    marginVertical: 30
  },
  searchBar: {
    width: 200,
    marginHorizontal: Platform.select({
        android: 5
    })
  },
  button: {
    marginHorizontal: Platform.select({
        android: 5
    })
  }
});