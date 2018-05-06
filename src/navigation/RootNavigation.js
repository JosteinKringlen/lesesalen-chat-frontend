import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginView from '../views/LoginView';
import MessageView from '../views/MessageView'
import RegisterView from '../views/RegisterView'
import StartView from '../views/StartView';

export const createRootNavigator = (firstTimeUser = false) => {
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
            Start: {
                screen: StartView,
                left: null
            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: firstTimeUser ? "Login" : "Start",
            cardStyle:{
                backgroundColor: 'white',
                padding:0,
                margin:0,

            }
        }
    );
}