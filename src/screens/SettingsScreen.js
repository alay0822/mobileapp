import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Profile Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('ProfileSettingsScreen')}>
          <View style={styles.settingItemContent}>
            <Ionicons name="person" size={24} color="#2a1eff" style={styles.iconLeft} />
            <Text style={styles.settingText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" style={styles.chevronIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <View style={styles.settingItemContent}>
            <Ionicons name="key" size={24} color="#2a1eff" style={styles.iconLeft} />
            <Text style={styles.settingText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" style={styles.chevronIcon} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Additional Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Additional Settings</Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('AboutUsScreen')}>
          <View style={styles.settingItemContent}>
            <Ionicons name="information-circle" size={24} color="#2a1eff" style={styles.iconLeft} />
            <Text style={styles.settingText}>About Us</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" style={styles.chevronIcon} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Log Out */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Logout')}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
    height: 90,
    
   

  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10, // Ensure space between the icon and the text
  },
  settingsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 15,
  },
  settingItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 8, // Ensure space between icon and text
    fontWeight: '500',
  },
  iconLeft: {
    marginRight: 12,
    marginLeft: 12,
  },
  // Adjusting the chevron icon position
  chevronIcon: {
    marginRight: 15, // Added more space to the right of the chevron icon
  },
  logoutButton: {
    backgroundColor: '#2a1eff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    width: 140,
    marginTop: 'auto',
    marginBottom: 50,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default SettingsScreen;
