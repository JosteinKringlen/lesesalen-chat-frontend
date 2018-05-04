import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';

export default class MessageView extends Component {

    constructor() {
        super();
        this.state = {
            text: 'Enter message',
            messages: []
        };

        this.onSend = this.onSend.bind(this);
        this.socket = SocketIOClient('http://localhost:5000')
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Håper du bruker SVN til dette prosjektet ❤️',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'http://www.fjellbrass.no/medlemmer/AtleGeitung.JPG',
                    },
                },

            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        alert("hei");
        this.socket.send('message', 'Hello world!');
    }

    render() {
        return (
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        width: '80%',
        borderWidth: 1
    }
});