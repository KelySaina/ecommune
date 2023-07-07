import { View } from "react-native"
import { Image,Text } from "@react-native-material/core"



const Details = () => {
    return (
        <>
        <View>
            <Image
                source={require('./assets/icon.png')} 
                style={{ width: 200, height: 200 }} 
            />   
            
            
        </View>
        </>
    )
}

export default Details