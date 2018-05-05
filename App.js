import React, { Component } from 'react';
import { KeyboardAvoidingView, AsyncStorage } from 'react-native';

import { createRootNavigator } from "./src/navigation/RootNavigation";
import Expo from 'expo';

console.disableYellowBox = true;


async function register(){
    const { status } = await Expo.Permissions.askAsync(
        Expo.Permissions.NOTIFICATIONS
    );
    if(status !== 'granted'){
        alert('You need to enable notifications in system settings!')
        return;
    }

    const token = await Expo.Notifications.getExpoPushTokenAsync();
    console.log(status, token);
}

export default class App extends Component {

    constructor(){
        super();
        this.state={
            signedIn: false,
        };
        this.checkIfUserIsLoggedIn = this.checkIfUserIsLoggedIn.bind(this);
        //this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    listen = ({ origin, data }) => {
        console.log('Push data: ', origin, data);
    };

    componentWillUnmount(){
        this.listener && Expo.Notifications.removeListener(this.listen);
    }

    componentWillMount(){
        /*this.setLoggedIn().then(
            res => {console.log('good shit');}
        );*/

        register().catch(console.log());
        this.listener = Expo.Notifications.addListener(this.listen);

        this.checkIfUserIsLoggedIn()
            .then(res => {
                console.log("res: " + res);
                this.setState({signedIn: res});
            })
    }

    /*async setLoggedIn(){
        try {
            //await AsyncStorage.setItem('LOGGED_IN', 'true')
            //await AsyncStorage.removeItem('LOGGED_IN');
        } catch (err) {
            console.log(err);
        }
    }*/

    async checkIfUserIsLoggedIn(){
        try {
           return await AsyncStorage.getItem('LOGGED_IN');
        }
        catch (err) {
            console.log('Could not get info about login state');
        }
    }

    render() {

        const {signedIn} = this.state;
        const RootLayout = createRootNavigator(signedIn);
        return (
            <KeyboardAvoidingView
                behavior={'padding'} style={{flex: 1}} keyboardVerticalOffset={30}
            >
                <RootLayout style={{backgroundColor:'#fff'}}/>
            </KeyboardAvoidingView>
        )
    }
}