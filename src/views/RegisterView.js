import React, { Component } from 'react';
import {Button, ScrollView, Text, TextInput, View} from "react-native";

export default class RegisterView extends Component{
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{padding: 20, backgroundColor: 'white'}}>
                <Text
                    style={{fontSize: 27}}>
                    Register
                </Text>
                <TextInput placeholder={'Name'}/>
                <TextInput placeholder='Email'/>
                <TextInput placeholder='Password'/>
                <View style={{margin: 7}}/>
                <Button
                    onPress={() => navigate('Login')}
                    title="Submit"
                />
            </ScrollView>
        )
    }
}