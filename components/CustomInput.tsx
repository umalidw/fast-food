import React from 'react';
import {CustomInputProps} from "@/type";
import {Text, TextInput, View} from "react-native";
import cn from "clsx";

function CustomInput({
    placeholder='Enter text',
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType="default",
                     }:CustomInputProps) {

    const [focused, setFocused] = React.useState(false);

    return (
         <View className='w-full'>
             <Text className='label'>{label}</Text>
             <TextInput
             autoCapitalize={'none'}
             autoCorrect={false}
             value={value}
             onChangeText={onChangeText}
             secureTextEntry={secureTextEntry}
             keyboardType={keyboardType}
             onFocus={() => setFocused(true) }
             onBlur={() => setFocused(false)  }
             placeholder={placeholder}
             placeholderTextColor='#888'
             className={cn('input',focused ? 'border-primary' : 'border-gray-30000')}
             />
         </View>
    );
}

export default CustomInput;