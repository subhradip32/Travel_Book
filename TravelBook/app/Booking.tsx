import { Text, View } from "react-native";
import {primary_color} from "../constants/colors"; 

export default function Booking() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primary_color
      }}
    >
      <Text>Booking page</Text>
    </View>
  );
}