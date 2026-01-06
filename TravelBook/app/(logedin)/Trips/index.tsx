import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as colors from "../../../constants/colors";
import { useRouter } from "expo-router";


export default function Trips() {
  const navigator = useRouter();

  function AddTrip(){
    console.log("Button Pressed");
    // explicit route to the trip location screen (located in the (AddTrip) group)
    navigator.push("/Trips/addtrip_location");
  }



  return (
    <View style={styles.container}>
      {/* Floating Add Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={AddTrip}>
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_color,
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent_color, // or any accent color
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
    elevation: 5, // Android shadow
    shadowColor: colors.accent_color2, // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
});
