import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MessageView from '../views/MessageView';

export const Stack = createSwitchNavigator({
    Chat: {
        screen: MessageView,
        navigationOptions: {
            headerMode: 'none'
        }
    },
});