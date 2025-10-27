import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet, Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const UploadReceiptScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const requestPermissions = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = async () => {
    setModalVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // 🔴 DISABLE editing
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    setModalVisible(false);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // 🔴 DISABLE editing
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      // Show success alert first
      alert('Receipt Uploaded Successfully!');
      
      // Ensure navigation happens right after the alert is dismissed
      setTimeout(() => {
        navigation.navigate('ReceiptViewScreen', { 
          receiptImageUri: selectedImage,
          billData: {
            id: 17,
            dueDate: '2021/4/16',
            status: 'Paid',
            total: 3133
          }
        });
      }, 2000); // 200ms delay to make sure alert has time to be dismissed
    } else {
      alert('Please select an image first');
    }
  };

  const handleCancel = () => {
    setSelectedImage(null); // clears the uploaded image
    navigation.navigate('AccountInfo'); // Change this to navigate to AccountInfoScreen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AccountInfo')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}> Upload Receipt</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.uploadBox} onPress={() => setModalVisible(true)}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <>
              <Ionicons name="image-outline" size={50} color="#888" />
              <Text style={styles.uploadText}> Tap to Choose Image</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.othersButton]} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
              <Ionicons name="image" size={24} color="#000" style={styles.icon} />
              <Text style={styles.modalText}>Photo Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
              <Ionicons name="camera" size={24} color="#000" style={styles.icon} />
              <Text style={styles.modalText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancel}>
              <Text style={{ color: '#2a1eff', fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: '#2a1eff',
    padding: 15,
    paddingTop: 50,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 500, // Optional tweak here
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  uploadText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 500, // or any fixed height you prefer
    resizeMode: 'contain', // ✅ shows full image without crop
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
    maxWidth: 300,
  },
  uploadButton: {
    backgroundColor: '#2a1eff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  othersButton: {
    backgroundColor: '#4d88ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginRight: 10,
  },
  modalCancel: {
    paddingVertical: 15,
    alignItems: 'center',
  }
});

export default UploadReceiptScreen;
