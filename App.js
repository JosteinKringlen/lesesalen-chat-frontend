import React, { Component } from 'react';
import { KeyboardAvoidingView, AsyncStorage } from 'react-native';

import { createRootNavigator } from "./src/navigation/RootNavigation";

console.disableYellowBox = true;

export default class App extends Component {

    constructor(){
        super();
        this.state={
            signedIn: false,
        };
        this.checkIfUserIsLoggedIn = this.checkIfUserIsLoggedIn.bind(this);
        //this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    componentWillMount(){
        /*this.setLoggedIn().then(
            res => {console.log('good shit');}
        );*/
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