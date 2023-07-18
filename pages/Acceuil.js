import { View } from "react-native"
import BottomMenu from "../components/BottomMenu"
import ListProjet from "../components/ListProjet"
import { useState, useEffect } from "react"
import axios from "axios"
import { AppBar } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome'


const Acceuil = ({ navigation }) => {

    const [projetsData, setProjetsData] = useState([])

    useEffect(() => {
        getPro()
    }, [])

    const getPro = async () => {
        const response = await axios.get(`http://192.168.43.224:5555/proData`)
        const data = response.data
        setProjetsData(data)
    }

    return (
        <>
            <AppBar title="Acceuil" trailing={<Icon name='refresh' size={35} style={{ marginRight: 10 }} color='white' onPress={() => {
                getPro()
            }} />} />

            <View style={{ height: '85%' }}>
                {
                    projetsData.map((p, index) => (
                        <ListProjet key={index} refresh={getPro} titre={p.titre} stat={p.stat} />
                    ))
                }


            </View>

            <BottomMenu navigation={navigation} refresh={getPro} />

        </>
    )

}


export default Acceuil