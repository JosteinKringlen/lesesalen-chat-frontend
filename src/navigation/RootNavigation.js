import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginView from '../views/LoginView';
import MessageView from '../views/MessageView'
import RegisterView from '../views/RegisterView'

export const createRootNavigator = (signedIn = false) => {
    return createStackNavigator(
        {
            Chat: {
                screen: MessageView,
                left: null,
            },
            Login: {
                screen: LoginView,
                left: null
            },
            Register: {
                screen: RegisterView,
                left: null
            },
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "Chat" : "Login",
            cardStyle:{
                backgroundColor: '#EBEBEB',
                padding:0,
                margin:0,

            }
        }
    );
}