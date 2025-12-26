import * as colors from "@/constants/colors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function tabs_lay(){
    return(
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.accent_color2,
      headerShown: false
  }}>
      <Tabs.Screen
        name="Trips"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="card-travel" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  ); 
}; 