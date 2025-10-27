import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

const IntroScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0 (invisible)

  useEffect(() => {
    // Fade-in effect for the intro screen
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to opacity 1 (fully visible)
      duration: 1500, // Fade duration (1.5 seconds)
      useNativeDriver: true,
    }).start();

    // After 1.5 seconds, fade-out and navigate to LoginScreen
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out to opacity 0 (invisible)
        duration: 1500, // Duration of the fade effect (1.5 seconds)
        useNativeDriver: true,
      }).start();

      // Navigate to LoginScreen after fade-out
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);
    }, 1500);

    // Cleanup
    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Fade-in and fade-out effect */}
      <Animated.Image
        style={[styles.image, { opacity: fadeAnim }]} // Apply fade effect to the image
        source={require('../assets/LOGO.png')} // Ensure the image path is correct
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        {'PayRentv2'}
      </Animated.Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3D58',
    marginBottom: 10,
  },
});

export default IntroScreen;
