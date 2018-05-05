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
                    style={{fontSize: 27}}>
                    Register
                </Text>
                <TextInput placeholder={'Name'} onChangeText={(text) => this.setState({username: text})}/>
                <TextInput placeholder='Email' keyboardType={'email-address'} onChangeText={(text) => this.setState({email: text})}/>
                <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                <View style={{margin: 7}}/>
                <Button
                    onPress={() => {
                        this.onRegisterButtonPress(this.state.username, this.state.email, this.state.password);
                        navigate('Login')
                    }
                    }
                    title="Submit"
                />
            </ScrollView>
        )
    }
}

const Styles = StyleSheet.create({
    component: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'

    }
});