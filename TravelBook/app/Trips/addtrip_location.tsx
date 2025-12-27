import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import * as colors from "../../constants/colors"; 
import * as urls from "../../utils/urls"; 

export default function Addtrip_location(){
    const [location, setlocation] = useState(""); 

    function handlelocation(){
        console.log(location);
        urls.HandleLocationQuery(location);
    }

    // useEffect(() => {
    //     console.log(location);
    // }, [location]); 

    return(
        <View>
            <TextInput style={style.input_feild} onChangeText={setlocation} value={location} placeholder="Enter Location" onEndEditing={handlelocation}/>
        </View>
    ); 
}

const style = StyleSheet.create({
    input_feild: {
        borderWidth: 5, 
        borderColor: colors.accent_color,
        borderRadius: 20, 
        margin: 20, 
        padding: 10
    }  
})