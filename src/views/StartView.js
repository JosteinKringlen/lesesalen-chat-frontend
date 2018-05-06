import React, { Component } from 'react';

import Onboarding from 'react-native-onboarding-swiper'
import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";


export default class StartView extends Component{

    render(){
        return (

            <Onboarding
                showSkip={false}
                showDone={false}
                pages={[
                    {
                        title: 'Hey, There!',
                        subtitle: 'Welcome to MeetSpin!',
                        image: <Image
                            style={{width:100, height:100}}
                            source={require('../../logo.png')}
                        />,
                        backgroundColor: '#F43041',
                    },
                    {
                        title: 'Find Friends',
                        subtitle: "Get to know the friends you didn’t know you wanted to know",
                        backgroundColor: '#4281A4',
                    },
                    {
                        title: 'Chat',
                        subtitle: 'Send cool chat messages',
                        backgroundColor: '#48A9A6',
                    },
                    {
                        title: "Let's Get Started!",
                        subtitle: (

                            /*
                            * The actual login button
                            * First it gets user_events, and then
                            * prompts for rsvp_event
                            */
                            <View contentContainerStyle={styles.component}>
                                <Button
                                    onPress={() => this.props.navigation.navigate('Login')}
                                    color={'#4281A4'}
                                    title="Go To Login!"
                                />
                            </View>
                        ),
                        backgroundColor: '#F43041',
                    },
                ]}/>

        )
    }

}

const styles = StyleSheet.create({
    component: {
        padding: 20,
        backgroundColor: '#EBEBEB',
        flex: 2,
        justifyContent: 'center',
        alignContent:'center'

    },
    buttons: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingTop: 20
    }
});