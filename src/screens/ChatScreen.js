import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const initialMessages = [
  {
    id: '1',
    type: 'received',
    text: 'Hi Alyza Shane, Thanks for your interest in renting our property. We\'re excited to have you as a tenant. We\'ve reviewed your application and everything looks great',
  },
  {
    id: '2',
    type: 'sent',
    text: 'Great, thanks! What are the next steps?',
  },
  {
    id: '3',
    type: 'received',
    text: 'I will send over the lease for you to sign. We can also discuss your move-in date and the required security deposit',
  },
  {
    id: '4',
    type: 'sent',
    text: 'That works for me. When is the earliest move-in date?',
  },
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      type: 'sent',
      text: input,
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <Image
              source={require('../../assets/profile.jpg')}
              style={styles.avatar}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.name} numberOfLines={1}>Alyza Shane Lumay</Text>
              <Text style={styles.tenantTag} numberOfLines={1}>Tenant in Pad #1</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Chat Area */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatListContent}
          style={styles.chatList}
          renderItem={({ item }) => (
            <View
              style={[
                styles.chatBubble,
                item.type === 'sent' ? styles.sent : styles.received,
              ]}
            >
              <Text style={[
                styles.chatText,
                item.type === 'sent' ? styles.sentText : styles.receivedText,
              ]}>
                {item.text}
              </Text>
            </View>
          )}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={styles.sendBtn} 
            onPress={sendMessage}
            disabled={input.trim() === ''}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: { 
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    marginTop: 24,
  },
  profileTextContainer: {
    flex: 1,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  tenantTag: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chatBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: '80%',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 4,
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#2a1eff',
    borderBottomRightRadius: 4,
  },
  chatText: {
    fontSize: 15,
    lineHeight: 20,
  },
  receivedText: {
    color: '#333',
  },
  sentText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 51,
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: {
    marginLeft: 12,
    backgroundColor: '#2a1eff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    opacity: 1,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default ChatScreen;