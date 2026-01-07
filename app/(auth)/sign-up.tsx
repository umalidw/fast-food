import {Button, Text, View} from "react-native";
import {router} from "expo-router";

function SignIn() {
    return (
        <View>
            <Text>Sign Up</Text>
            <Button title="Sign In" onPress={()=> router.push("/sign-in")}/>
        </View>
    );
}

export default SignIn;