// import * as colors from "@/constants/colors";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { Stack, Tabs } from "expo-router";
// import Feather from '@expo/vector-icons/Feather';
// import { Session } from "@supabase/supabase-js";
// import { supabase } from "@/components/Supabase/db_client";

// export default function tabs_lay(){
//     const {data} = await supabase.auth.getSession();
//     return(
//     <Stack initialRouteName="login" screenOptions={{
//         headerShown: false
//     }}>
//         <Stack.Screen name ="login"/>
//         <Stack.Screen name ="(logedin)"/>
//     </Stack>
//   ); 
// }; 

import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "@/components/Supabase/db_client";
import { Session } from "@supabase/supabase-js";

export default function TabsLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!session ? (
        <Stack.Screen name="login" />
      ) : (
        <Stack.Screen name="(logedin)" />
      )}
    </Stack>
  );
}
