

import {Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Slot} from "expo-router";
import {images} from "@/constants";
import {Image} from "expo-image";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

function _Layout() {
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

export default _Layout;