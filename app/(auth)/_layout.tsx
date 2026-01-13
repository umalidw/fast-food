

import {Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";
import {Image} from "expo-image";

import {useAuthStore} from "@/store/auth.store";

function AuthLayout() {

    const {isAuthenticated} = useAuthStore();

    if (isAuthenticated) return  <Redirect href="/" />;

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative " style={{height:Dimensions.get("screen").height / 2.25}} >
                     <ImageBackground source={images.loginGraphic}  resizeMode="stretch" className="size-full rouned-b-lg"/>
                    <View className="absolute w-full items-center" style={{ bottom: -40 }}>
                        <Image
                            source={images.logo}
                            style={{ width: 150, height: 150 }}
                            contentFit="contain"
                        />
                    </View>
                </View>

                <Slot/>
            </ScrollView>

        </KeyboardAvoidingView>
    );
}

export default AuthLayout;