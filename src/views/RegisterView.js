import React, {Component} from 'react';
import {Button, ScrollView, Text, TextInput, View, StyleSheet} from "react-native";

export default class RegisterView extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            email: '',
            password: '',
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
            .then(res => console.log(res))
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView contentContainerStyle={Styles.component}>
                <Text
                    style={{fontSize: 32, paddingBottom: 20}}>
                    Register
                </Text>
                <TextInput
                    placeholder={'Full Name'}
                    onChangeText={(text) => this.setState({username: text})}
                    returnKeyType = {"next"}
                    autoFocus = {true}
                    onSubmitEditing={() => {this.Email.focus();}}
                    borderBottomColor={'#48A9A6'}
                    style={{paddingBottom: 20}}
                    underlineColorAndroid={'#48A9A6'}
                    placeholderTextColor={'darkgrey'}
                />
                <TextInput
                    ref={(input) => {this.Email = input;}}
                    placeholder='Email'
                    keyboardType={'email-address'}
                    onChangeText={(text) => this.setState({email: text})}
                    returnKeyType = {"next"}
                    onSubmitEditing={() => {this.Password.focus();}}
                    borderBottomColor={'#48A9A6'}
                    style={{paddingBottom: 20}}
                    underlineColorAndroid={'#48A9A6'}
                    placeholderTextColor={'darkgrey'}
                />
                <TextInput
                    ref={(input) => {this.Password = input;}}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    returnKeyType = {"go"}
                    onSubmitEditing={() => {this.onRegisterButtonPress(this.state.username, this.state.email, this.state.password)}}
                    borderBottomColor={'#48A9A6'}
                    underlineColorAndroid={'#48A9A6'}
                    placeholderTextColor={'darkgrey'}
                    style={{paddingBottom: 20}}
                />
                <View style={{margin: 7}}/>
                <Button
                    onPress={() => {
                        this.onRegisterButtonPress(this.state.username, this.state.email, this.state.password);
                        navigate('Login')
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
        backgroundColor: '#EBEBEB',
        flex: 1,
        justifyContent: 'center'

    }
});