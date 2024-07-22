import { Button, StyleSheet, Text, TextInput, View, Image, Pressable, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function DishCard() {
    const navigation = useNavigation();

    return (
      <Pressable style={styles.container} onPress={() => navigation.navigate("Details", {
        isAlternativeDetailsPage: false
      })}>
        <Image style={styles.imageBox}/>
        <View style={styles.contentBox}>
          <Text style={styles.dishName}>Nazwa Dania 1</Text>
          <Text style={styles.category}>Kategoria: Mięsne</Text>
        </View>
        <View style={styles.buttonsBox}>
          <Ionicons style={styles.button} name="star-outline" size={40} color="black"/>
          <Ionicons style={styles.button} name="information-circle-outline" size={40} color="black"/>
        </View>
      </Pressable>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#aaaaaa',
    margin: 10
  },
  imageBox:{
    width: 80,
    height: 80,
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: '#777777'
  },
  buttonsBox: {
    marginRight: 5
  },
  button: {
    margin: 5
  },
  contentBox: {
    marginTop: 10,
    marginLeft: -20
  },
  dishName: {
    fontSize: Platform.select({
      ios: 20,
      android: 28
    })
  },
  category: {
    fontSize: Platform.select({
      ios: 10,
      android: 15
    })
  }
});
