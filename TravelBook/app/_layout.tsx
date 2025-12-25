import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { accent_color2 } from "@/constants/colors";


export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: accent_color2
    }}>
      <Tabs.Screen name="Trips" options={{
        tabBarIcon:({color, size})=>(
          <MaterialIcons name="tour" size={size} color={color} />
        ),
      }}/>
      <Tabs.Screen name="Booking" options={{
        tabBarIcon: ({color, size})=>(
          <MaterialIcons name="travel-explore" size={size} color={color} />
        ), 
      }}/>
    </Tabs>
  );
}
