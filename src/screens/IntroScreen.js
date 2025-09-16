import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PayrentApp</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default IntroScreen;
