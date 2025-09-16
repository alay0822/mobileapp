import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate logout process (e.g., clearing tokens, etc.)
    const logout = async () => {
      // Clear any stored user session here if applicable
      // Example: await AsyncStorage.clear();

      // Optional confirmation (can be removed for silent logout)
      Alert.alert(
        'Logged Out',
        'You have been successfully logged out.',
        [
          {
            text: 'OK',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          },
        ],
        { cancelable: false }
      );
    };

    logout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2a1eff" />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

export default LogoutScreen;
