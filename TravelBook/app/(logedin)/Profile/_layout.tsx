import { accent_color2 } from "@/constants/colors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, Tabs } from "expo-router";


export default function Layout(){
    return(
        <Stack initialRouteName="index" screenOptions={{
            headerShown: false 
        }}>
            <Stack.Screen name="index"/>
        </Stack>
    ); 
};