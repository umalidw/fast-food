import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {Text} from "react-native";
import {Slot} from "expo-router";

function _Layout() {
    return (
        <SafeAreaView>
            <Text>Auth Layout</Text>
            <Slot/>
        </SafeAreaView>
    );
}

export default _Layout;