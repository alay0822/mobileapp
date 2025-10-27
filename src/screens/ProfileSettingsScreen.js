import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, StatusBar, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Import image picker

const ProfileSettingsScreen = ({ navigation }) => {
  const [name, setName] = useState('Alyza Shane Lumay');
  const [email, setEmail] = useState('alyzashane1704@gmail.com');
  const [contactNumber, setContactNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // State to hold the profile picture

  // Function to handle image selection
  const handleChangePicture = async () => {
    // Request permission to access the media library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.uri); // Set the selected image as the profile picture
    }
  };

  const handleSave = () => {
    // Logic for saving profile information
    Alert.alert(
      'Profile Updated!',
      'Your profile changes have been saved.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SettingsScreen'), // Navigate to SettingsScreen after the alert
        },
      ],
      { cancelable: false }
    );
  };

  return (
    // FIX: Replaced SafeAreaView with a standard View to allow the header to fill the top
    <View style={styles.flexContainer}> 
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.back} /> {/* spacer to keep title centered */}
      </View>

      {/* FIX: Now wrap the content below the header in a SafeAreaView */}
      <SafeAreaView style={styles.contentContainer}>
        {/* Profile Picture and Change Button */}
        <View style={styles.profilePicContainer}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require('../../assets/profile.jpg')} // Default avatar if no image
            style={styles.profilePic}
          />
          {/* Modified Change Picture Button */}
          <TouchableOpacity style={styles.changePicButton} onPress={handleChangePicture}>
            <Ionicons name="camera" size={18} color="#fff" /> {/* Smaller icon size */}
          </TouchableOpacity>
        </View>

        {/* Full Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Contact Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={contactNumber}
            onChangeText={setContactNumber}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  // New top-level container to hold everything
  flexContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a1eff',
    paddingHorizontal: 15,
    height: 90,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
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
    flex: 1,
    textAlign: 'left',
  },
  // The content container now applies the main padding and a flex to push content down
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  changePicButton: {
    position: 'absolute',
    bottom: 0,
    right: 90,
    backgroundColor: '#2a1eff',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#2a1eff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileSettingsScreen;