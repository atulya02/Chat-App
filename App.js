import React, { Component } from 'react';
import { StyleSheet,TextInput ,Text, View,TouchableOpacity } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import  LoginPage  from './components/LoginPage';
import HomeScreen from './components/HomeScreen';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import ChatScreen from './components/ChatScreen';
const AppStack = createStackNavigator({ Home: HomeScreen,Chat:ChatScreen});
const AuthStack = createStackNavigator({ Login: LoginPage });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
