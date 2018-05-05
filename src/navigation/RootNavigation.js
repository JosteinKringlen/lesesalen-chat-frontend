import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginView from '../views/LoginView';
import { Stack } from "./StackNavigation";

export const createRootNavigator = (signedIn = false) => {
    return createStackNavigator(
        {
            Chat: {
                screen: Stack,
                left: null,
            },
            Login: {
                screen: LoginView,
                left: null

            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "Chat" : "Login",
            cardStyle:{
                backgroundColor: 'white'
            }
        }
    );
}