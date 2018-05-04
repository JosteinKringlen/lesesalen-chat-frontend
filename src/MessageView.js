import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';

const USER_ID = '@userId';

export default class MessageView extends Component {

    constructor() {
        super();
        this.state = {
            text: 'Enter message',
            messages: [],
            userId: null
        };

        this.determineUser = this.determineUser.bind(this);
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this._storeMessages = this._storeMessages.bind(this);

        this.socket = io.connect('http://lesesalen-chat.herokuapp.com/', {
            'transports': ['websocket']
        });

        this.socket.on('on_connect', this.onReceivedMessage);
        this.socket.on('message', this.onReceivedMessage);
        this.determineUser();
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1001,
                    text: 'Håper du bruker SVN til dette prosjektet ❤️',
                    createdAt: new Date(),
                    user: {
                        _id: 1002,
                        name: 'React Native',
                        avatar: 'http://www.fjellbrass.no/medlemmer/AtleGeitung.JPG',
                    },
                },

            ],
        })
    }


    /**
     * When a user joins the chatroom, check if they are an existing user.
     * If they aren't, then ask the server for a userId.
     * Set the userId to the component's state.
     */
    determineUser() {
        AsyncStorage.getItem(USER_ID)
            .then((userId) => {
                // If there isn't a stored userId, then fetch one from the server.
                if (!userId) {
                    this.socket.emit('userJoined', null);
                    this.socket.on('userJoined', (userId) => {
                        AsyncStorage.setItem(USER_ID, userId);
                        this.setState({userId});
                    });
                } else {
                    this.socket.emit('userJoined', userId);
                    this.setState({userId});
                }
            })
            .catch((e) => alert(e));
    }

    /**
     * When the server sends a message to this.
     */
    onReceivedMessage(messages) {
        console.log(messages);

        //TODO: Don't hard code
        let message = {
            _id: 15,
            text: messages.data,
            createdAt: new Date(),
            user: {
                _id: 1002,
                name: 'React Native',
                avatar: 'http://www.fjellbrass.no/medlemmer/AtleGeitung.JPG',
            },
        };
        this._storeMessages(message);
    }

    onSend(messages = []) {
        this.socket.send(messages[0]);
        this._storeMessages(messages);
    }

    // Helper functions
    _storeMessages(messages) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }

    render() {

        let user = { _id: this.state.userId || -1 };
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={user}
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