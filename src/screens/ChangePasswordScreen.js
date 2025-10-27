import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { BlurView } from '@react-native-community/blur'; // Import BlurView for blur effect

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert('Success', 'Password changed successfully!', [
      {
        text: 'OK', 
        onPress: () => navigation.navigate('SettingsScreen') // Navigate to ProfileSettingsScreen after success
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADERNGA NAY ARROW BACK UG BLUE BACKGROUND */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Old Password */}
        <View style={styles.inputContainer}>
          <BlurView
            style={styles.input}
            blurType="light" // You can change the blur type for different effects
            blurAmount={10} // Adjust the blur intensity
          >
            <TextInput
              style={styles.input}
              placeholder="Enter old password"
              secureTextEntry={!showOldPassword} // Toggle visibility with state
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
              <Ionicons
                name={showOldPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#aaa"
                style={styles.icon}
              />
            </TouchableOpacity>
          </BlurView>
        </View>

        {/* New Password */}
        <View style={styles.inputContainer}>
          <BlurView
            style={styles.input}
            blurType="light"
            blurAmount={10}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              secureTextEntry={!showNewPassword} // Toggle visibility with state
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Ionicons
                name={showNewPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#aaa"
                style={styles.icon}
              />
            </TouchableOpacity>
          </BlurView>
        </View>

        {/* Confirm New Password */}
        <View style={styles.inputContainer}>
          <BlurView
            style={styles.input}
            blurType="light"
            blurAmount={10}
          >
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              secureTextEntry={!showConfirmPassword} // Toggle visibility with state
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#aaa"
                style={styles.icon}
              />
            </TouchableOpacity>
          </BlurView>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Para sa ubos sa header
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a1eff', // Blue background
    paddingVertical: 14,
    paddingHorizontal: 15,
    paddingTop: 40, // I-adjust para sa status bar area
    padding: 15,
    height: 90, // Adjustable height for the header
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // White text color
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    flex: 1,
  },
  icon: {
    marginLeft: -35, // Adjust icon position
  },
  button: {
    backgroundColor: '#2a1eff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15, // Dugang space gikan sa katapusang input
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
