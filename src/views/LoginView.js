import React, {Component} from 'react';
import {Button, ScrollView, Text, TextInput, View, AsyncStorage, StyleSheet} from "react-native";

export default class LoginView extends Component {

    componentDidMount(){
      this.onLogOutPressed();
    }

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',

            loggedIn: false,
        };

        this.userSuccessFullLogin = this.userSuccessFullLogin.bind(this);
        this.onLoginButtonPressed = this.onLoginButtonPressed.bind(this);
    }

    async onLoginButtonPressed (username, password){

        let formdata = new FormData();
        formdata.append('username', username);
        formdata.append('password', password);

        fetch('http://lesesalen-chat.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formdata
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.userSuccessFullLogin(res)
                        .then(res => this.setState({loggedIn: true}))
                        .catch(err => console.log(err));
                }
            })
    };

    async userSuccessFullLogin(res) {
        console.log(typeof res)
        console.log(res);
        try {
            //await AsyncStorage.setItem('LOGGED_IN', 'true')
            await AsyncStorage.multiSet([['LOGGED_IN', 'true'],['USERNAME', res.username],['ID', res.id]])
        } catch (err) {
            console.log(err);
        }
    };

    onLogOutPressed = () => {
        fetch(fetch('http://lesesalen-chat.herokuapp.com/logout')
            .then(res => res.json())
            .then(res => console.log(res)));

        AsyncStorage.multiRemove(['LOGGED_IN', 'USERNAME', 'ID']);
    };

    render() {
        const {navigate} = this.props.navigation;

        if (this.state.loggedIn) navigate('Chat');

        return (

            <ScrollView contentContainerStyle={Styles.component}>
                <Text
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Username' onChangeText={(text) => this.setState({username: text})}/>
                <TextInput placeholder='Password' secureTextEntry={true}
                           onChangeText={(text) => this.setState({password: text})}/>
                <View style={{margin: 7}}/>
                <Button
                    onPress={() => this.onLoginButtonPressed(this.state.username, this.state.password)}
                    title="Submit"
                />
                <Button
                    style={Styles.buttons}
                    onPress={() => navigate('Register')}
                    title={'Register'}
                />
                <Button
                    onPress={() => this.onLogOutPressed}
                    title={'Sign Out'}
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

    },
});