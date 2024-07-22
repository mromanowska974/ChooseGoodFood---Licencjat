import { Button, StyleSheet, Text, TextInput, View, Image, ScrollView, Platform } from 'react-native';


export default function DishDetails({ navigation, route }) {
    const { isAlternativeDetailsPage } = route.params;
    return (
      <View>
        <Image style={styles.imageBox}/>
        <Text style={styles.dishName}>Nazwa dania 1</Text>
        <ScrollView style={styles.container}>
          <View style={styles.contentBox}>
              <Text style={styles.text}>Składniki:</Text>
              
              <View style={styles.contentLine}>
                  <Text style={styles.text}>Cena dania:</Text>
                  <Text style={styles.text}>34,56 zł</Text>
              </View>
              <View style={styles.contentLine}>
                  <Text style={styles.text}>Wartość kaloryczna:</Text>
                  <Text style={styles.text}>345 kcal</Text>
              </View>
              <View style={styles.contentLine}>
                  <Text style={styles.text}>Indeks glikemiczny:</Text>
                  <Text style={styles.text}>34</Text>
              </View>
              <View style={styles.contentLine}>
                  <Text style={styles.text}>Porcja: </Text>
                  <Text style={styles.text}>250g</Text>
              </View>
              <View style={styles.contentLine}>
                  <Text style={styles.text}>Kategoria: </Text>
                  <Text style={styles.text}>Mięsne</Text>
              </View>
          </View>
        </ScrollView>
        <View style={styles.button}>
        {isAlternativeDetailsPage ? 
          <Button title='Porównaj' onPress={() => navigation.navigate('Comparison')}/> :
          <Button title='Pokaż zamiennik' onPress={() => 
              navigation.navigate('AlternativeDetails', {
                isAlternativeDetailsPage: true
              })
          }/>
        }
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {

  },
  imageBox: {
    margin: 15,
    width: Platform.select({
      ios: 350,
      android: 380
    }),
    height: Platform.select({
      ios: 350,
      android: 380
    }),
    backgroundColor: '#777777'
  },
  dishName: {
    fontSize: Platform.select({
      ios: 25,
      android: 35
    }),
    textAlign: 'center'
  },
  contentBox: {
    margin: 30,   
  },
  text: {
    fontSize: Platform.select({
      ios: 12,
      android: 17
    })
  },
  contentLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  button: {
    marginHorizontal: Platform.select({
      android: 100
    }),
    marginBottom: Platform.select({
      ios: 700
    }),
    marginTop: Platform.select({
      android: 10
    })
  }
});
