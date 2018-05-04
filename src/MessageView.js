import React, { Component }from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default class MessageView extends Component {

    constructor(){
        super();
        this.state={
            text: 'Enter message'
        }
    }

    render (){
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={this.state.text}
                    onChangeText={(text) => this.setState({text})}
                    clearTextOnFocus={true}
                    autoCapitalize={'sentences'}
                />
                <TouchableOpacity onPress={() => alert(this.state.text)}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        width: '80%',
        borderWidth:1
    }
});