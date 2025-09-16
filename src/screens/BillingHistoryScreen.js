import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const billingData = Array(6).fill({
  id: 34,
  dueDate: '2025/5/12',
  rent: 5000,
  water: 150,
  electric: 200,
  total: 5350,
  status: 'Paid',
  receipt: {
    amount: 46000,
    receiptNo: 'No. 2023 100 $13866',
    points: 'Top 11,523 (45 pts)'
  }
});

const BillingHistoryScreen = ({ navigation }) => {
  const handleViewReceipt = (bill) => {
    navigation.navigate('ReceiptViewScreen', {
      billData: bill,
      receiptData: bill.receipt
    });

  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AccountInfo')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Billing History</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {billingData.map((bill, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>Billing Id: <Text style={styles.value}>{bill.id}</Text></Text>
            <Text style={styles.label}>Due Date: <Text style={styles.value}>{bill.dueDate}</Text></Text>
            <Text style={[styles.status, bill.status === 'Paid' ? styles.paidStatus : styles.unpaidStatus]}>
              Status: {bill.status}
            </Text>
            <Text style={styles.label}>Rent Fee: <Text style={styles.amount}>₱{bill.rent.toLocaleString()}</Text></Text>
            <Text style={styles.label}>Water Bill: <Text style={styles.amount}>₱{bill.water.toLocaleString()}</Text></Text>
            <Text style={styles.label}>Electric Bill: <Text style={styles.amount}>₱{bill.electric.toLocaleString()}</Text></Text>
            <Text style={styles.total}>Total: ₱{bill.total.toLocaleString()}</Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => handleViewReceipt(bill)}
            >
              <Ionicons name="receipt-outline" size={16} color="#fff" />
              <Text style={styles.buttonText}>Check The Receipt</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: {
    backgroundColor: '#2a1eff',
    paddingTop: 50,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontWeight: '500',
    color: '#333',
  },
  amount: {
    color: '#d32f2f',
    fontWeight: '500',
  },
  status: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  paidStatus: {
    color: '#388e3c',
  },
  unpaidStatus: {
    color: '#d32f2f',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2a1eff',
    marginTop: 8,
    marginBottom: 4,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2a1eff',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default BillingHistoryScreen;

