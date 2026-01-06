import { View, Button , Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import * as colors from "../constants/colors";
import { Image } from 'expo-image'; 
import Entypo from '@expo/vector-icons/Entypo';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const ProfileUserDetails = (user : any) => {

    function shareButtonClicked(){
        console.log("Share username"+ user.user_name);
    }

  return (
    <View style={styles.container}>
        {/* Share Icon */}
        <TouchableOpacity style={styles.shareIcon}>
            <Entypo name="share" size={20} onPress={shareButtonClicked} color={colors.secondary_color} />
        </TouchableOpacity>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source="https://picsum.photos/id/20/696/300"
                contentFit="cover"
                transition={1000}
            />
        </View>

        {/* Basic User Details */}
        <Text style={styles.name}>{user.user_name}</Text>
        <Text style={styles.email}>{user.user_email}</Text>
        
    </View>
  );
}

export default ProfileUserDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary_color, 
        borderRadius: 20,
        margin: 20, 
        padding: 20,
        alignItems: "center", 
        justifyContent: "center",
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        position: 'relative',
    }, 
    shareIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 10,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: colors.secondary_color,
    }
});
