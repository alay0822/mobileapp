import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import IntroScreen from './src/screens/IntroScreen';
import LoginScreen from './src/screens/LoginScreen';
import AccountInfoScreen from './src/screens/AccountInfoScreen';
import MenuScreen from './src/screens/MenuScreen';
import UploadReceiptScreen from './src/screens/UploadReceiptScreen';
import BillingHistoryScreen from './src/screens/BillingHistoryScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ChatScreen from './src/screens/ChatScreen';
import ReceiptViewScreen from './src/screens/ReceiptViewScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import SignUpScreen from './src/screens/SignUpScreen';


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
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
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
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;