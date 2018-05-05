import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';

export default class MessageView extends Component {

    constructor() {
        super();
        this.state = {
            text: 'Enter message',
            messages: [],
            userId: null,
            username: '',
        };

        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
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
    }

    async getUserInfo(){
        try {
            await AsyncStorage.getItem('USERNAME')
                .then(res => this.setState({username: res}));
            await AsyncStorage.getItem('USER_ID')
                .then(res => this.setState({userId: res}))
        } catch (e) {
            console.log('Error in getUserInfo. Error below:');
            console.log(e);
        }
    }

    /**
     * When the server sends a message to this.
     */
    onReceivedMessage(message) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }))
    }

    onReceivedSystemMessage(message) {
        let messageJson = JSON.parse(message);
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messageJson),
        }))
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        let message = messages[0];
        this.socket.send(message);
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
