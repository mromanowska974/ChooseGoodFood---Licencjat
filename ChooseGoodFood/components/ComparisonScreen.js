import { View, Text, StyleSheet, Platform } from 'react-native';

export default function ComparisonScreen(){
    return(
        <View>
            <View style={styles.compareBox}>
                <Text style={styles.dishName}>Nazwa dania 1</Text>
                <Text style={styles.dishName}>Danie domowe 1</Text>
            </View>
            <Text>Składniki</Text>
            {/* tu będą listy składników */}
            <Text>Cena dania</Text>
            <View style={styles.compareBox}>
                <Text>cena 1</Text>
                <Text>cena 2</Text>
            </View>
            <Text>Wartość kaloryczna</Text>
            <View style={styles.compareBox}>
                <Text>wk 1</Text>
                <Text>wk 2</Text>
            </View>
            <Text>Indeks glikemiczny</Text>
            <View style={styles.compareBox}>
                <Text>ig 1</Text>
                <Text>ig 2</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  compareBox: {
    flexDirection: 'row'
  },
  dishName: {
    fontSize: Platform.select({
        ios: 20,
        android: 28
    })
  }
});
