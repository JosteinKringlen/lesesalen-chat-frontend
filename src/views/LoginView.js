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
        await AsyncStorage.setItem('LOGGED_IN', 'true');
        await AsyncStorage.setItem('USERNAME', res.username.toString());
        await AsyncStorage.setItem('USER_ID', res.id.toString());
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

            <ScrollView contentContainerStyle={styles.component}>
                <Text
                    style={{fontSize: 32, paddingBottom: 20}}>
                    Login
                </Text>
                <TextInput
                  placeholder = 'Full Name'
                  onChangeText = {(text) => this.setState({username: text})}
                  returnKeyType = {"next"}
                  autoFocus = {true}
                  onSubmitEditing={() => {this.Password.focus();}}
                  style={{paddingBottom: 20}}
                  borderBottomColor={'#48A9A6'}
                />
                <TextInput
                  ref={(input) => {this.Password = input;}}
                  placeholder='Password'
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({password: text})}
                  returnKeyType={'go'}
                  onSubmitEditing={() => {this.onLoginButtonPressed(this.state.username, this.state.password)}}
                  style={{paddingBottom: 20}}
                  borderBottomColor={'#48A9A6'}
                />
                <View style={{margin: 7}}/>
                <View style={styles.buttons}>
                <Button
                    onPress={() => this.onLoginButtonPressed(this.state.username, this.state.password)}
                    color={'#4281A4'}
                    title="Submit"
                />
                <Button
                    style={styles.buttons}
                    onPress={() => navigate('Register')}
                    title={'Register'}
                    color={'#4281A4'}
                />
                <Button
                    onPress={() => this.onLogOutPressed}
                    color={'#4281A4'}
                    title={'Sign Out'}
                />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    component: {
        padding: 20,
        backgroundColor: '#EBEBEB',
        flex: 2,
        justifyContent: 'center',
        alignContent:'center'

    },
    buttons: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingTop: 20
    }
});
