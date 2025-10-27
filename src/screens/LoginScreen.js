import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.navigate('AccountInfo');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      
      {/* 👇 LOGO */}
      <Image 
        source={require('../assets/LOGO.png')} // ibutang imong logo diri
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>PayRentv2</Text>
      
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Input your username"
        value={username}
        onChangeText={setUsername}
      />
      
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Input your password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,   // pwede nimo adjust
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 25,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    paddingRight: 45,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 13,
  },
  forgotPassword: {
    color: '#4d88ff',
    textAlign: 'right',
    marginBottom: 25,
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#2a1eff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
