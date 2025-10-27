// src/screens/NotificationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const notifications = [
  { id: '1', message: 'your payment mark as paid' },
  { id: '2', message: 'Sent you a message' },
  { id: '3', message: 'your payment mark as paid' },
  { id: '4', message: 'your payment mark as paid' },
  { id: '5', message: 'your payment mark as unpaid' },
  { id: '6', message: 'your payment mark as paid' },
  { id: '7', message: 'your payment mark as paid' },
  { id: '8', message: 'your payment mark as paid' },
];

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [readAll, setReadAll] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Read All Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Read All</Text>
        <Switch value={readAll} onValueChange={setReadAll} />
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Image
              source={require('../../assets/profile.jpg')}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.sender}>Landlord</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.time}>7 Min ago</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a1eff',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    height: 90,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',  // Align the title to the left
    marginLeft: 10, // Add some space from the left edge
    flex: 1,  // Ensure it takes up space to the left
  },

  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },

  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  sender: {
    fontWeight: 'bold',
  },
  message: {
    color: '#333',
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
});

export default NotificationsScreen;
