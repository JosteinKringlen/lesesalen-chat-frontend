import React, {Component} from 'react';
import {Button, ScrollView, Text, TextInput, View} from "react-native";

export default class LoginView extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{padding: 20, backgroundColor: 'white'}}>
                <Text
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Username'/>
                <TextInput placeholder='Password'/>
                <View style={{margin: 7}}/>
                <Button
                    onPress={() => navigate('Chat')}
                    title="Submit"
                />
            </ScrollView>
        )
    }
}