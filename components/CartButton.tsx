import {View, Text, TouchableOpacity} from "react-native";
import {Image} from "expo-image";
import {images} from "@/constants";


function CartButton() {

    const totTalItems = 10;

    return (
         <TouchableOpacity className="cart-btn" onPress={() => {}}>

             <Image
                 source={images.bag}
                 style={{width: 15, height: 15}}
                 contentFit="contain"

             />
             {totTalItems > 0 && (
                 <View className="cart-badge">
                     <Text className="small-bold text-white">{totTalItems}</Text>
                 </View>
             )}
         </TouchableOpacity>
    );
}

export default CartButton;