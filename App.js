import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MessageView from './src/MessageView';

export default class App extends React.Component {
    render() {
        return(
            <MessageView/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
