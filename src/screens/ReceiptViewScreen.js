import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReceiptViewScreen = ({ route, navigation }) => {
  const receiptImageUri = route?.params?.receiptImageUri;
  const billData = route?.params?.billData;

  const handleDownload = () => {
    alert('Receipt downloaded successfully!');
  };

  // If data is missing, show error
  if (!receiptImageUri || !billData) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 20, fontSize: 16, color: 'red' }}>
          Error: Missing receipt data. Please go back and upload again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BillingHistory')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receipt</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Receipt Image */}
        <View style={styles.receiptContainer}>
          <Image 
            source={{ uri: receiptImageUri }} 
            style={styles.receiptImage}
            resizeMode="contain"
          />
        </View>

        {/* Receipt Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Payment Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Billing ID:</Text>
            <Text style={styles.detailValue}>{billData.id}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date Paid:</Text>
            <Text style={styles.detailValue}>{billData.dueDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[styles.detailValue, styles.paidStatus]}>
              {billData.status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount:</Text>
            <Text style={[styles.detailValue, styles.amount]}>
              ₱{billData.total.toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Download Button */}
      <TouchableOpacity 
        style={styles.downloadButton}
        onPress={handleDownload}
      >
        <Ionicons name="download-outline" size={20} color="#fff" />
        <Text style={styles.downloadButtonText}>Download Receipt</Text>
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
    backgroundColor: '#2a1eff',
    paddingTop: 50,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 80, // Space for download button
  },
  receiptContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  receiptImage: {
    width: '100%',
    height: 400,
  },
  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2a1eff',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  paidStatus: {
    color: '#388e3c',
    fontWeight: 'bold',
  },
  amount: {
    color: '#2a1eff',
    fontWeight: 'bold',
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#2a1eff',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ReceiptViewScreen;

