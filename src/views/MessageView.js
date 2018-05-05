import React, {Component} from 'react';
import {StyleSheet, AsyncStorage} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';

const USER_ID = '@userId';

let counter = 1;
let counter2 = 1000;

export default class MessageView extends Component {

    constructor() {
        super();
        this.state = {
            text: 'Enter message',
            messages: [],
            userId: null,
            username: '',
        };

        //this.determineUser = this.determineUser.bind(this);
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this._storeMessages = this._storeMessages.bind(this);
        this.onReceivedSystemMessage = this.onReceivedSystemMessage.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);

        this.socket = io.connect('http://lesesalen-chat.herokuapp.com/', {
            'transports': ['websocket']
        });


        this.socket.on('on_connect', (response) => console.log(response));
        this.socket.on('message', this.onReceivedMessage);
        this.getUserInfo()
            .then(res => {
                this.socket.emit('join', {username: this.state.username});
            });
        this.socket.on('system', this.onReceivedSystemMessage);
        //this.determineUser();
    }

    /**
     * When a user joins the chatroom, check if they are an existing user.
     * If they aren't, then ask the server for a userId.
     * Set the userId to the component's state.
     */
    /*determineUser() {
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
    }*/

    async getUserInfo(){
        try {
            await AsyncStorage.getItem('USERNAME')
                .then(res => {
                    alert(res);
                    this.setState({username: res})
                })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * When the server sends a message to this.
     */
    onReceivedMessage(messages) {
        this._storeMessages(messages)
    }

    onReceivedSystemMessage(messages) {
        const messageJson = JSON.parse(messages);
        console.log("soidhfoisdhfiosd");
        console.log(this.state.username);
        console.log("System Message:");
        console.log(messageJson);
        this._storeMessages(messageJson)
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        let message = messages[0];
        this.socket.send(messages[0]);
    }

    render() {

        let user = {_id: this.state.userId || -1};
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={user}
            />
        )
    }

}
