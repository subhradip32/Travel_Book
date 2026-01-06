import React, { useState, useRef } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  primary_color,
  secondary_color,
  accent_color,
  accent_color2,
} from "@/constants/colors";

import { supabase } from "../components/Supabase/db_client";
import { useRouter } from "expo-router";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigator = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= ANIMATIONS ================= */

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const switchTab = (login: boolean) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: login ? 0 : -10,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLogin(login);
  };

  /* ================= AUTH FUNCTIONS ================= */

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error
      else{
        navigator.push("/Trips");
      }
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (!data.session) {
        Alert.alert(
          "Verify Email",
          "Please check your inbox to verify your email"
        );
      }
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? "Login to plan your next trip"
              : "Create an account to start exploring"}
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.activeToggle]}
              onPress={() => switchTab(true)}
              disabled={loading}
            >
              <Text style={styles.toggleText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleButton, !isLogin && styles.activeToggle]}
              onPress={() => switchTab(false)}
              disabled={loading}
            >
              <Text style={styles.toggleText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {isLogin ? (
              <>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={secondary_color}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />

                <TextInput
                  placeholder="Password"
                  placeholderTextColor={secondary_color}
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={secondary_color} />
                  ) : (
                    <Text style={styles.primaryButtonText}>Login</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor={secondary_color}
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                />

                <TextInput
                  placeholder="Email"
                  placeholderTextColor={secondary_color}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />

                <TextInput
                  placeholder="Password"
                  placeholderTextColor={secondary_color}
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />

                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={secondary_color}
                  secureTextEntry
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={primary_color} />
                  ) : (
                    <Text style={styles.secondaryButtonText}>
                      Create Account
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Animated.View>

          <Text style={styles.footerHint}>Plan • Explore • Travel</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: primary_color,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: secondary_color,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
    color: secondary_color,
    opacity: 0.7,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: primary_color,
    borderRadius: 22,
    padding: 24,
    shadowColor: secondary_color,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  toggleContainer: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: secondary_color,
    overflow: "hidden",
    marginBottom: 24,
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },

  activeToggle: {
    backgroundColor: accent_color,
  },

  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: secondary_color,
  },

  input: {
    borderWidth: 1,
    borderColor: secondary_color,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: secondary_color,
    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: accent_color,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: secondary_color,
  },

  secondaryButton: {
    backgroundColor: accent_color2,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: primary_color,
  },

  footerHint: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: secondary_color,
    opacity: 0.5,
  },
});
