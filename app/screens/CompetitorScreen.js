import React, { Component } from 'react'
import { Text, SafeAreaView, Button } from 'react-native'

export default class CompetitorScreen extends Component {
    render() {
        return (
            <SafeAreaView>
                <Text> CompetitorScreen </Text>
                <Button title="Go to competitor details" onPress={() => this.props.navigation.navigate("CompetitorDetails")}/>
            </SafeAreaView>
        )
    }
}
