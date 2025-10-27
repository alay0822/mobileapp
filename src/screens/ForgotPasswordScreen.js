import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';

// --- Password Validation Rules ---
const passwordRules = [
  { key: 'length', text: 'At least 8 characters long', regex: /.{8,}/ },
  { key: 'uppercase', text: 'At least one UPPERCASE letter (A-Z)', regex: /[A-Z]/ },
  { key: 'lowercase', text: 'At least one lowercase letter (a-z)', regex: /[a-z]/ },
  { key: 'number', text: 'At least one number (0-9)', regex: /[0-9]/ },
  
];

const validatePassword = (password) => {
  const results = {};
  passwordRules.forEach(rule => {
    results[rule.key] = rule.regex.test(password);
  });
  return results;
};

// --- Component to display requirements ---
const PasswordRequirements = ({ password }) => {
  if (!password) {
    // Show all requirements when user starts typing
    const allReminders = passwordRules.map(rule => ({ ...rule, valid: false }));
    return (
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Password must meet the following:</Text>
        {allReminders.map(item => (
          <View key={item.key} style={styles.requirementItem}>
            <Ionicons name="alert-circle-outline" size={14} color="#FFD700" style={{ marginRight: 5 }} />
            <Text style={styles.requirementText}>{item.text}</Text>
          </View>
        ))}
      </View>
    );
  }

  const validation = validatePassword(password);
  const isMatch = passwordRules.every(rule => validation[rule.key]);

  return (
    <View style={styles.requirementsContainer}>
      <Text style={styles.requirementsTitle}>Password requirements:</Text>
      {passwordRules.map(item => (
        <View key={item.key} style={styles.requirementItem}>
          <Ionicons 
            name={validation[item.key] ? 'checkmark-circle' : 'close-circle'} 
            size={14} 
            color={validation[item.key] ? '#00A86B' : '#C70039'} 
            style={{ marginRight: 5 }} 
          />
          <Text style={[styles.requirementText, !validation[item.key] && { color: '#C70039' }]}>
            {item.text}
          </Text>
        </View>
      ))}
      <Text style={styles.validationSummaryText}>
        {isMatch ? 'Password strength: STRONG' : 'Password strength: Needs improvement'}
      </Text>
    </View>
  );
};


const ChangePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Stage 0: Focus on Email 
  // Stage 1: Focus on OTP 
  // Stage 2: Focus on Passwords 
  const [stage, setStage] = useState(0); 
  const [enteredEmail, setEnteredEmail] = useState('');

  // --- Core Logic ---

  const handleMainAction = () => {
    if (stage === 0) {
      handleSendOtp();
    } else if (stage === 2) { 
      handleChangePassword();
    }
  };

  const handleVerifyOtp = () => {
    if (stage !== 1) return;
    
    if (!otp || otp.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit OTP.');
      return;
    }
    
    if (otp !== '1234') { 
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      return;
    }

    setStage(2);
  };
  
  const handleSendOtp = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    
    setEnteredEmail(email); 
    Alert.alert('OTP Sent', `An OTP has been sent to ${email}.`, [
      { text: 'OK', onPress: () => setStage(1) }
    ]);
  };
  
  const handleChangePassword = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    
    // **NEW: Check password strength before changing**
    const validation = validatePassword(password);
    const isStrong = passwordRules.every(rule => validation[rule.key]);

    if (!isStrong) {
        Alert.alert('Error', 'Your new password does not meet all the required security criteria. Please check the reminders below.');
        return;
    }
    
    Alert.alert('Success', 'Password changed successfully!', [
      { text: 'OK', onPress: () => navigation.replace('Login') },
    ]);
  };

  const getFullWidthButtonText = () => {
    if (stage === 0) {
      return 'Send OTP';
    } else if (stage === 2) {
      return 'Change Password';
    }
    return ''; 
  };
  
  const getNoteText = () => {
    if (stage === 0) {
      return 'Enter your email address to start the password reset.';
    } else if (stage === 1) {
      return `A 4-digit OTP has been sent to ${enteredEmail}.`;
    } else {
      return 'Create and confirm your new password.';
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Change Password</Text>
        </View>

        <SafeAreaView style={styles.safeContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            <Ionicons name="lock-closed-outline" size={48} color="#2a1eff" style={styles.icon} />
            <Text style={styles.noteText}>{getNoteText()}</Text>

            {/* 1. Email Input (Disabled in stages 1 & 2) */}
            <View style={styles.inputWrapper}>
  <TextInput
    style={[styles.input, stage > 0 && styles.disabledInput, styles.emailInput]}  // Added a new style `emailInput`
    placeholder="Enter email address"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
    editable={stage === 0}
  />
</View>

            
            {/* 2. OTP Input and Verify Button (Side-by-Side) */}
            <View style={styles.inputRow}>
              <View style={styles.otpInputWrapper}>
                  <TextInput
                    style={[styles.input, stage !== 1 && styles.disabledInput, {paddingRight: 16}]}
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={4} 
                    editable={stage === 1}
                  />
              </View>
              <TouchableOpacity 
                  onPress={handleVerifyOtp} 
                  style={[styles.sideButton, stage !== 1 && styles.disabledButton]}
                  disabled={stage !== 1}
              >
                  <Text style={styles.sideButtonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>


            {/* 3. New Password Input (Editable in Stage 2) */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, stage < 2 && styles.disabledInput]}
                placeholder="Enter new password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                editable={stage === 2}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)} 
                style={styles.eyeIcon} 
                disabled={stage < 2}
              >
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color={stage < 2 ? '#ccc' : '#888'} />
              </TouchableOpacity>
            </View>

            {/* 4. Confirm Password Input (Editable in Stage 2) */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, stage < 2 && styles.disabledInput]}
                placeholder="Retype new password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={stage === 2}
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
                style={styles.eyeIcon}
                disabled={stage < 2}
              >
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color={stage < 2 ? '#ccc' : '#888'} />
              </TouchableOpacity>
            </View>
            
            {/* **NEW: Password Reminders - Appears only in Stage 2** */}
            {stage === 2 && <PasswordRequirements password={password} />}

            {/* The single full-width button, placed at the very bottom, after all inputs */}
            {(stage === 0 || stage === 2) && (
              <TouchableOpacity 
                onPress={handleMainAction} 
                style={[styles.fullWidthButton, stage === 2 && { marginTop: 20 }]} // Add more top margin in stage 2
              >
                <Text style={styles.buttonText}>{getFullWidthButtonText()}</Text>
              </TouchableOpacity>
            )}

          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24, 
    alignItems: 'center',
    paddingBottom: 24, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    backgroundColor: '#2a1eff',
    height: 90,
  },
  backButton: { paddingRight: 16 },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: { marginBottom: 24 },
  noteText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingRight: 45,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    borderColor: '#eee',
    color: '#aaa',
  },
  // --- OTP Section ---
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  otpInputWrapper: {
    flex: 0.5, 
    position: 'relative',
    marginRight: 8,
  },
  sideButton: {
    flex: 0.5, 
    backgroundColor: '#2a1eff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  sideButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center', 
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
  // --- Full Width Button ---
  fullWidthButton: {
    width: '100%',
    backgroundColor: '#2a1eff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10, 
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // --- NEW: Requirements Styles ---
  requirementsContainer: {
    width: '100%',
    marginTop: -10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 13,
    color: '#666',
  },
  validationSummaryText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00A86B', // Default strong color
  },
  emailInput: {
    borderColor: 'black',  // Use a more prominent color for the border
    borderWidth: 2,  // Increase the border width to make it stand out
    backgroundColor: '#f8f8f8', // Light background for better contrast
    shadowColor: '#aaa',  // Adding shadow for a slight 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ChangePasswordScreen;