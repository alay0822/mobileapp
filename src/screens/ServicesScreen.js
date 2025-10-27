import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
// Note: You can use the standard 'SafeAreaView' from 'react-native' or 'react-native-safe-area-context'.
// Since you included both in your original file, I'll stick to the one from 'react-native-safe-area-context'
// but make the necessary style adjustments.
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';

const ServiceScreen = ({ navigation }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim() === '') {
      alert('Please fill in the reason.');
    } else {
      alert('Service Request Submitted!');
      // Logic to handle form submission can be added here.
    }
  };

  return (
    // 1. Use a standard View for the main screen container to allow the header to touch the top edge.
    // We will rely on the header's internal padding to handle the status bar.
    <View style={styles.flexContainer}> 
      
      {/* 2. The Header View with the full-width background */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Request</Text>
        <View style={styles.back} /> {/* spacer to keep title centered */}
      </View>
      
      {/* 3. Wrap the content in SafeAreaView and/or a Content Container */}
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Reason</Text>
          <TextInput
            style={styles.input}
            value={reason}
            onChangeText={setReason}
            placeholder="Input reason for service request"
            multiline
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  // New container style to take up the full screen space
  flexContainer: {
    flex: 1,
    backgroundColor: '#fff', // Main background for the entire screen
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Important for centering
    backgroundColor: '#2a1eff',
    paddingHorizontal: 15,
    height: 90,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 10,
  },
  back: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    flex: 1, // Allow title to take up remaining space
    textAlign: 'left', // Center the text within its space
    marginRight: 40, // Offset the spacer on the right for true centering
  },
  // New container for form content, which includes the main screen padding (20)
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,

  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    height: 100, // Add alignment to ensure text starts at the top left in multiline inputs
    textAlignVertical: 'top', 
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#2a1eff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceScreen;