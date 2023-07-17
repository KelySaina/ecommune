import { View } from "react-native"
import { Text } from "@react-native-material/core"
import BottomMenu from "../components/BottomMenu"


const Acceuil = ({navigation}) => {
    return (
        <>
        
        <View style={{height:'90%'}}>
            <Text>Acceuil</Text>
            
        </View>

        <BottomMenu navigation={navigation} />
        
        </>
    )

}


export default Acceuil