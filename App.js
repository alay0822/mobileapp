import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import IntroScreen from './src/screens/IntroScreen';
import LoginScreen from './src/screens/LoginScreen';
import AccountInfoScreen from './src/screens/AccountInfoScreen';
import UploadReceiptScreen from './src/screens/UploadReceiptScreen';
import BillingHistoryScreen from './src/screens/BillingHistoryScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ChatScreen from './src/screens/ChatScreen';
import ReceiptViewScreen from './src/screens/ReceiptViewScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import ProfileSettingsScreen from './src/screens/ProfileSettingsScreen';
import SettingsScreen from './src/screens/SettingsScreen';  
import ServicesScreen from './src/screens/ServicesScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';


const Stack = createStackNavigator();

const App = () => {

    
  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // default for all screens
          }}
        >
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Logout" component={LogoutScreen} />
          <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} /> 
          <Stack.Screen name="ProfileSettingsScreen" component={ProfileSettingsScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
          <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
             

          <Stack.Screen
            name="Menu"
            component={AccountInfoScreen}
            options={{
              cardStyleInterpolator: ({ current, layouts }) => ({
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-layouts.screen.width, 0], // left-to-right
                      }),
                    },
                  ],
                },
              }),
            }}
          />
          <Stack.Screen name="UploadReceiptScreen" component={UploadReceiptScreen} />
          <Stack.Screen name="BillingHistory" component={BillingHistoryScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="ReceiptViewScreen" component={ReceiptViewScreen} />
          
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
