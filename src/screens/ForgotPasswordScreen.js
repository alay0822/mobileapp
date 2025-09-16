import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert('Success', 'Password changed successfully!', [
      { text: 'OK', onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.replace('Login')}>
    <Ionicons name="arrow-back" size={28} color="#fff" />
  </TouchableOpacity>
  <Text style={styles.headerText}>Change Password</Text>
</View>


          <View style={styles.content}>
            <Ionicons name="lock-closed-outline" size={48} color="#2a1eff" style={styles.icon} />
            <Text style={styles.noteText}>Please enter your new password and confirm it below.</Text>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Retype your new password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
              <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  marginTop: 35,
  backgroundColor: '#2a1eff',
},
headerText: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
  marginLeft: 16, // spacing after arrow
},
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 24,
  },
  noteText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingRight: 45, // add space for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
  button: {
    width: '100%',
    backgroundColor: '#2a1eff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChangePasswordScreen;
