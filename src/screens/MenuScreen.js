import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';


const MenuScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableHighlight
          onPress={() => navigation.navigate('AccountInfo')}
          underlayColor="transparent"
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>

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
        <MenuItem icon="notifications" title="Notifications" />
        <MenuItem icon="time" title="History" />
        <MenuItem icon="help-circle" title="About Us" />
      </View>

      {/* Logout Button at Bottom */}
      <View style={styles.logoutContainer}>
        <MenuItem icon="log-out" title="Log Out" />
      </View>
    </View>
  );
};

const MenuItem = ({ icon, title }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (title === 'History') {
      navigation.navigate('BillingHistory');
    } else if (title === 'Notifications') {
      navigation.navigate('Notifications');
    } else if (title === 'About Us') {
      navigation.navigate('About Us');
    } else if (title === 'Log Out') {
      navigation.navigate('Logout');
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.menuItem,
        {
          backgroundColor: pressed ? '#e0e4ff' : '#f9f9f9', // highlight on tap
        },
      ]}
    >
    
      <View style={styles.menuItemContent}>
        <Ionicons name={icon} size={24} color="#2a1eff" style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#aaa" style={styles.arrowIcon} />
      </View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a1eff',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#666',
  },

  menuOptions: {
    paddingHorizontal: 30,
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

  logoutContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 'auto',
  },
});

export default MenuScreen;
