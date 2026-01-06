import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Profile_user_details from "@/components/profile_user_details";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as colors from "./../../../constants/colors";
import { supabase } from "@/components/Supabase/db_client";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";


export default function Profile() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) return;

      const user = data.session.user;

      setEmail(user.email ?? "");
      setUsername(
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        "User"
      );
      console.log(user);
    };
    loadUser();
  }, []);

  async function Signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Logging Out", error.message);
    } else {
      router.replace("/login");
    }
  }

  return (
    <View>
        {/* Main Profile tab */}
      <Profile_user_details
        user_name={username}
        user_email={email}
      />


        {/* Additional details */}
        



        {/* Sign out tab */}
      <TouchableOpacity
        style={styles.signout_btn}
        onPress={Signout}
      >
        <MaterialIcons name="logout" size={24} color="black" />
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles= StyleSheet.create({
    signout_btn:{
        padding: 15,
        margin: 10,
        backgroundColor: colors.accent_color,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 30,
    }
}); 
