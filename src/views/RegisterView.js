import React, {Component} from 'react';
import {Button, ScrollView, Text, TextInput, View, StyleSheet} from "react-native";

export default class RegisterView extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            email: '',
            password: '',

            next: false
        };
    }

    onRegisterButtonPress = (username, email, password) => {

        let formdata = new FormData();
        formdata.append('username', username);
        formdata.append('email', email);
        formdata.append('password', password);

        fetch('http://lesesalen-chat.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formdata
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 200){
                    alert("Success!");
                    this.setState({next: true});
                }
                else {
                    alert("Could not register");
                    this.setState({next: false});
                }
            })
    };


    render() {
        const {navigate} = this.props.navigation;
        if(this.state.next){
            navigate('Login')
        }
        return (
            <ScrollView contentContainerStyle={Styles.component}>
                <Text
                    style={{fontSize: 32, paddingBottom: 20, color:'white'}}>
                    Register
                </Text>
                <TextInput
                    placeholder={'Full Name'}
                    onChangeText={(text) => this.setState({username: text})}
                    returnKeyType = {"next"}
                    autoFocus = {true}
                    onSubmitEditing={() => {this.Email.focus();}}
                    style={{paddingBottom: 20}}
                    underlineColorAndroid={'#48A9A6'}
                    borderBottomColor={'#48A9A6'}
                    placeholderTextColor={'white'}
                    autoCapitalize={'none'}
                />
                <TextInput
                    ref={(input) => {this.Email = input;}}
                    placeholder='Email'
                    keyboardType={'email-address'}
                    onChangeText={(text) => this.setState({email: text})}
                    returnKeyType = {"next"}
                    onSubmitEditing={() => {this.Password.focus();}}
                    style={{paddingBottom: 20}}
                    underlineColorAndroid={'#48A9A6'}
                    borderBottomColor={'#48A9A6'}
                    placeholderTextColor={'white'}
                    autoCapitalize={'none'}
                />
                <TextInput
                    ref={(input) => {this.Password = input;}}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    returnKeyType = {"go"}
                    onSubmitEditing={() => {this.onRegisterButtonPress(this.state.username, this.state.email, this.state.password)}}
                    underlineColorAndroid={'#48A9A6'}
                    borderBottomColor={'#48A9A6'}
                    placeholderTextColor={'white'}
                    autoCapitalize={'none'}
                    style={{paddingBottom: 20}}
                />
                <View style={{margin: 7}}/>
                <Button
                    onPress={() => {
                        this.onRegisterButtonPress(this.state.username, this.state.email, this.state.password);
                    }
                    }
                    title="Submit"
                    color={'#4281A4'}
                />
            </ScrollView>
        )
    }
}

const Styles = StyleSheet.create({
    component: {
        padding: 20,
        backgroundColor: '#F43041',
        flex: 1,
        justifyContent: 'center'

    }
});