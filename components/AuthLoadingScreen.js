import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import User from '../User';
import firebase from 'firebase';
export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    componentWillMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyDM8XLMX4XJC9fZZsEVIRWULFJGyJ2ccto",
            authDomain: "react-chat-app-32e70.firebaseapp.com",
            databaseURL: "https://react-chat-app-32e70.firebaseio.com",
            projectId: "react-chat-app-32e70",
            storageBucket: "",
            messagingSenderId: "715182514372",
            appId: "1:715182514372:web:0b381cf023986841"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }





    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return ( <View>
            <ActivityIndicator/>
            <StatusBar barStyle = "default"/>
            </View>
        );
    }
}