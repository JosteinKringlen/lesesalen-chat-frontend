import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import MessageView from './src/MessageView';

console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView
                behavior={'padding'} style={{flex: 1}} keyboardVerticalOffset={30}
            >
                <MessageView/>
            </KeyboardAvoidingView>
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
