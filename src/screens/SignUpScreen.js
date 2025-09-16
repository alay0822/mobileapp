import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Add logic to register the user (API call or local storage)
    if (email && password) {
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
  <Text style={styles.link}>
    Already have an account? <Text style={styles.linkBold}>Log In</Text>
  </Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 30, 
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center'
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5,
    padding: 12, 
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2a1eff', 
    padding: 15, 
    borderRadius: 5, 
    marginBottom: 10,
   
  },
  buttonText: {
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  link: {
    color: '#4d88ff', 
    textAlign: 'center', 
    marginTop: 10, 
},
  linkBold: {
    fontWeight: 'bold',
    color: '#4d88ff',
    fontSize: 14,
  },
});

export default SignUpScreen;
