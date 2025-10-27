import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeatureItem = ({ text }) => (
  <View style={styles.listItem}>
    <Ionicons name="checkmark-circle" size={20} color="#2a1eff" style={{ marginTop: 2 }} />
    <Text style={styles.listItemText}>{text}</Text>
  </View>
);

const AboutUsScreen = ({ navigation }) => {
  const goBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log('Mocking goBack navigation');
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER - Blue background, back arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 40 }}>
        <View style={styles.mainContent}>
          <View style={styles.centeredSection}>
            <Text style={styles.mainTitle}>Welcome to PayRentv2</Text>
            <Text style={styles.subDescription}>Making rental payments seamless and efficient.</Text>
          </View>

          <Text style={styles.paragraph}>
            At PayRentv2, we are committed to making rental payments more convenient and efficient for both tenants and property owners. Our goal is to provide a seamless experience through our web-based rental payment monitoring system, which simplifies the payment process and ensures timely reminders for both parties.
          </Text>

          <Text style={styles.sectionHeader}>Our Mission</Text>
          <Text style={styles.paragraph}>
            Our mission is to enhance the rental payment experience by offering a reliable, user-friendly platform that helps tenants keep track of their payments and assists property owners in managing their rental income. With integrated SMS notifications, PayRentv2 ensures that billing reminders are sent promptly, minimizing delays and avoiding late fees.
          </Text>

          <Text style={styles.sectionHeader}>What We Offer</Text>
          <Text style={{ ...styles.paragraph, marginTop: 0, marginBottom: 10 }}>
            PayRentv2 is designed to streamline rental payment tracking and management. Whether you are a tenant or a property owner, our system offers the following features:
          </Text>
          <View style={styles.listContainer}>
            <FeatureItem text="Real-time Payment Tracking: Monitor the status of your rental payments anytime." />
            <FeatureItem text="SMS Billing Reminders: Receive timely reminders via SMS to ensure payments are made on time." />
            <FeatureItem text="User-Friendly Interface: Easily navigate the system for both tenants and property owners." />
          </View>

          <Text style={styles.sectionHeader}>Why Choose Us</Text>
          <View style={styles.listContainer}>
            <FeatureItem text="Efficient Payment Management: Both tenants and property owners can stay updated with payment statuses and history." />
            <FeatureItem text="Timely Notifications: SMS alerts help avoid missed payments and late fees, improving financial management for both parties." />
            <FeatureItem text="Accessibility: Our platform is designed for ease of use, allowing you to access it from any device at any time." />
            <FeatureItem text="Secure Transactions: We prioritize security, ensuring your personal and payment information is safely managed." />
          </View>

          <Text style={styles.sectionHeader}>Our Commitment</Text>
          <Text style={styles.paragraph}>
            At PayRentv2, we believe in making the rental process as hassle-free as possible. We are dedicated to providing a platform that not only simplifies payments but also improves communication between tenants and property owners. Our focus on continuous improvement means that we are always looking for ways to enhance our system and better serve our users.
          </Text>

          {/* Contact Us Section */}
          <Text style={styles.sectionHeader}>Contact Us</Text>
          <Text style={{ ...styles.paragraph, paddingBottom: 20 }}>
            Have any questions or feedback? Feel free to reach out to our support team. We are here to assist you in making the most out of PayRentv2.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text> lumayshane1704@gmail.com
          </Text>

          <Text style={styles.sectionHeader}>Developer</Text>

          {/* Developer Information (Vertical Layout) */}
          <View style={styles.developerInfo}>
            <Image source={require('../assets/alyza.jpg')} style={styles.developerPhoto} />
            <Text style={styles.developerText}>Alyza Shane C. Lumay </Text>
            <Text style={styles.developerText}>System Analyst</Text>
          </View>

          <View style={styles.developerInfo}>
            <Image source={require('../assets/jude.png')} style={styles.developerPhoto} />
            <Text style={styles.developerText}>Jude Adrianne B. Jimoya</Text>
            <Text style={styles.developerTitleText}>Data Admin</Text>
          </View>

          <View style={styles.developerInfo}>
            <Image source={require('../assets/mark.jpg')} style={styles.developerPhoto} />
            <Text style={styles.developerText}>Mark Kenneth B. Caumban</Text>
            <Text style={styles.developerTitleText}>Backend</Text>
          </View>

          <View style={styles.developerInfo}>
            <Image source={require('../assets/LOGO.png')} style={styles.developerPhoto} />
            <Text style={styles.developerText}>Alaina B. Apolinario</Text>
            <Text style={styles.developerTitleText}>Researcher</Text>
          </View>

          <View style={styles.developerInfo}>
            <Image source={require('../assets/LOGO.png')} style={styles.developerPhoto} />
            <Text style={styles.developerText}>Michael Sebere</Text>
             <Text style={styles.developerTitleText}>Frontend</Text>
          </View>

          <Text style={styles.paragraph}>
            University of Science and Technology of Southern Philippines - CDO
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#2a1eff',
    padding: 16,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainContent: {
    padding: 20,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 672,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  centeredSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a1eff',
  },
  subDescription: {
    color: '#6b7280',
    marginTop: 4,
    fontSize: 14,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2a1eff',
    marginTop: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4,
  },
  paragraph: {
    fontSize: 16,
    color: '#374151',
    marginTop: 8,
    lineHeight: 24,
    textAlign: 'justify',
  },
  listContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#374151',
    flexShrink: 1,
    lineHeight: 24,
  },
  developerInfo: {
    flexDirection: 'column', // Vertical layout
    alignItems: 'center',
    marginBottom: 20, // Added space after each developer block
  },
  developerPhoto: {
  width: 80,
  height: 80,
  borderRadius: 40, // Makes the image circular (half of width/height)
  marginBottom: 10, // Space between photo and text
  },

  developerText: {
    fontSize: 16,
    color: '#01050bff',
    textAlign: 'center',
    fontWeight: '500',
    fontWeight: 'extrabold',
},
  developerTitleText: {
    fontSize: 16,
    color: '#01050bff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'extrabold',
  },
});



export default AboutUsScreen;
