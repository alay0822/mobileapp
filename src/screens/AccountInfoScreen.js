// ... import statements ...
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    const requestPermissions = async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    };
    requestPermissions();
  }, []);

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      Alert.alert('Success', 'Receipt uploaded from gallery!');
    }
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      Alert.alert('Success', 'Receipt captured from camera!');
    }
  };

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        {
          backgroundColor: pressed ? '#e0e4ff' : '#f9f9f9',
        },
      ]}
    >
      <View style={styles.menuItemContent}>
        <Ionicons name={icon} size={24} color="#2a1eff" style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#aaa" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openMenu}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Account Information</Text>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          {/* Account Info Rows */}
          <View style={styles.infoRow}><Text style={styles.label}>Full Name:</Text><Text style={styles.value}>Alyza Shane Lumay</Text></View>
          <View style={styles.divider} />
          <View style={styles.infoRow}><Text style={styles.label}>Contact Number:</Text><Text style={styles.value}>09706858417</Text></View>
          <View style={styles.divider} />
          <View style={styles.infoRow}><Text style={styles.label}>Account ID:</Text><Text style={styles.value}>11</Text></View>
        </View>

        {/* Payment Info */}
        <Text style={styles.paymentTitle}>Payment Information</Text>
        <View style={styles.paymentBox}>
          <View style={styles.paymentRow}><Text style={styles.paymentLabel}>Bill Id:</Text><Text style={styles.paymentValue}>17</Text></View>
          <View style={styles.paymentRow}><Text style={styles.paymentLabel}>Due Date:</Text><Text style={styles.paymentValue}>2021/4/16</Text></View>
          <View style={styles.paymentRow}><Text style={styles.paymentLabel}>Rent Fee:</Text><Text style={styles.paymentValue}>369</Text></View>
          <View style={styles.paymentRow}><Text style={styles.paymentLabel}>Electric Bill:</Text><Text style={styles.paymentValue}>2669</Text></View>
          <View style={styles.paymentRow}><Text style={styles.paymentLabel}>Water Bill:</Text><Text style={styles.paymentValue}>183</Text></View>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Total:</Text><Text style={styles.totalValue}>3133</Text></View>
        </View>

        {/* Upload Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => navigation.navigate('UploadReceiptScreen')}
          >
            <Text style={styles.saveButtonText}>Upload Receipt</Text>
          </TouchableOpacity>
        </View>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        )}
      </ScrollView>

      {/* Side Menu Overlay */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
              {/* Profile Section */}
              <View style={styles.profileContainer}>
                <Image
                  source={require('../../assets/profile.jpg')}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>Alyza Shane Lumay</Text>
                <Text style={styles.profileEmail}>alyzashane1704@gmail.com</Text>
              </View>

              {/* Menu Options */}
              <View style={styles.menuOptions}>
                <MenuItem icon="notifications" title="Notifications" onPress={() => navigation.navigate('Notifications')} />
                <MenuItem icon="time" title="History" onPress={() => navigation.navigate('BillingHistory')} />
                <MenuItem icon="help-circle" title="About Us" onPress={() => navigation.navigate('About Us')} />
              </View>

              {/* Logout Button at Bottom */}
              <View style={styles.logoutContainer}>
                <MenuItem icon="log-out" title="Log Out" onPress={() => navigation.navigate('Logout')} />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a1eff',
    padding: 15,
    paddingTop: 50,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  infoBox: {
    backgroundColor: '#cce0ff',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    marginTop: 40,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: { fontSize: 16, color: '#333' },
  value: { fontSize: 16, fontWeight: 'bold' },
  divider: {
    height: 1,
    backgroundColor: '#aaa',
    marginVertical: 5,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 30,
  },
  paymentBox: {
    backgroundColor: '#4d88ff',
    marginHorizontal: 15,
    borderRadius: 8,
    padding: 15,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentLabel: { color: '#fff', fontSize: 16 },
  paymentValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  totalLabel: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  totalValue: { color: 'red', fontSize: 18, fontWeight: 'bold' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  saveButton: {
    backgroundColor: '#2a1eff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 50,
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  previewImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginHorizontal: '5%',
    marginBottom: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: screenWidth * 0.75,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#666',
  },
  menuOptions: {
    paddingTop: 20,
  },
  logoutContainer: {
    paddingVertical: 20,
    marginTop: 'auto',
  },
  menuItem: {
    marginBottom: 12,
    borderRadius: 10,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AccountInfoScreen;
