import React from 'react'
import User from '../User'
import { TextInput,AsyncStorage ,Alert,Text, View,TouchableOpacity } from 'react-native';
import styles from '../constants/style';
import firebase from 'firebase';
export class LoginPage extends React.Component {
    static navigationOptions={
        header:null
    }

  constructor(props) {
      super(props)
  
      this.state = {
        phone:'',
        name:''
      }
  }
  
  
  handlePhone = (event) => {
   this.setState({ phone: event.target.value })
 }
 handleName = (text) => {
  this.setState({ name: text })
}

componentWillMount()
{
    AsyncStorage.getItem('userPhone').then(val=>{
        if(val)
        {
            this.setState({phone:val})
        }
    })
}
  submitForm=async()=>{
      if(this.state.phone.length<10)
      {
          Alert.alert('Error','Enter Valid Phone Number');
      }
      else
         {//save data
             await AsyncStorage.setItem('userPhone',this.state.phone);
             User.phone=this.state.phone;
             firebase.database().ref('users/'+User.phone).set({name:this.state.name});
             this.props.navigation.navigate('App');
         }
  }    
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                placeholder="Phone Number"
                keyboardType="numeric"
                style={styles.input}
                value={this.state.phone}
                onChangeText={(phone) => this.setState({phone})}
                />
                <TextInput
                placeholder="Name"
                style={styles.input}
                value={this.state.name} 
                onChangeText={(name) => this.setState({name})}
                />
                <TouchableOpacity onPress={this.submitForm}>
                    <Text style={styles.btnText}>Enter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoginPage
