import React from 'react';
import {SafeAreaView,View,TextInput,Text,TouchableOpacity,Dimensions,AsyncStorage} from 'react-native';
import styles from '../constants/style'
import User from '../User'
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
export default class ChatScreen extends React.Component {

    static navigationOptions=({navigation})=>{
        return{
            title:navigation.getParam('name',null)
        }
    }
constructor(props) {
    super(props);

    this.state = {
        person:{
           name: props.navigation.getParam('name'),
           phone: props.navigation.getParam('phone')
        },
        textMessage:'',
        messageList:[]
    }
}
componentWillMount(){
    let dbRef=firebase.database().ref('message').child(User.phone).child(this.state.person.phone)
    dbRef.on('child_added',(value)=>{
        this.setState((prevState)=>{
            return{
                messageList:[...prevState.messageList,value.val()]
            }
        })
    })
}




    
    handleChange=key=>val=>{
        
                this.setState({[key]:val})
            
    }
    sendMessage=async()=>{
        if(this.state.textMessage.length>0)
        {
            let msgId=firebase.database().ref('message').child(User.phone).child(this.state.person.phone).push().key;
            let updates={};
            let message={
                message:this.state.textMessage,
                time:firebase.database.ServerValue.TIMESTAMP,
                from:User.phone
            }
            updates['message/'+User.phone+'/'+this.state.person.phone+'/'+msgId]=message;
            updates['message/'+this.state.person.phone+'/'+User.phone+'/'+msgId]=message;
            firebase.database().ref().update(updates);
            this.setState({textMessage:''});
        }
    }
    renderRow=({item})=>{
        return(
            <View style={{flexDirection:'row',width:'60%',
            alignSelf:(item.from===User.phone)?'flex-end':'flex-start',
            backgroundColor:item.from===User.phone?'#0089cb':'#7cb342',
            borderRadius:5,
            marginBottom:10}}>
                <Text style={{color:'#fff',padding:7,fontSize:16}}>
                    {item.message}
                </Text>
                <Text style={{color:'#eee',padding:3,fontSize:12}}>{item.time}</Text>
            </View>
        )
    }

    render() {const screenHeight = Math.floor(Dimensions.get('window').height);
        return (            
            <SafeAreaView>
                <FlatList
                style={{padding:10,height:screenHeight*0.75}}
                data={this.state.messageList}
                renderItem={this.renderRow}
                keyExtractor={(item,index)=>index.toString()}
                />
                <View style={{flexDirection:'row',alignItems:'center'}}>                
                    <TextInput
                    style={styles.input}
                    value={this.state.textMessage}
                    placeholder="Type Message..."
                    onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity 
                    style={styles.btnText}
                    onPress={this.sendMessage}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}


