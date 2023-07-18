import { View } from "react-native"
import BottomMenu from "../components/BottomMenu"
import ListProjet from "../components/ListProjet"
import { useState, useEffect } from "react"
import axios from "axios"
import { AppBar } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome'


const Acceuil = ({ navigation }) => {

    const [projetsData, setProjetsData] = useState([])
    const [nb, setNb] = useState('')


    useEffect(() => {
        getPro()
        getNbPro()
    }, [])

    const getPro = async () => {
        const response = await axios.get(`http://192.168.1.198:5555/proData`)
        const data = response.data
        setProjetsData(data)
    }

    const getNbPro = async () => {
        const response = await axios.get(`http://192.168.1.198:5555/nbPro`)
        const data = response.data
        setNb(data[0].nb)
    }

    return (
        <>
            <AppBar title="Acceuil" trailing={<Icon name='refresh' size={35} style={{ marginRight: 10 }} color='white' onPress={() => {
                getPro()
            }} />} />

            <View style={{ height: '85%' }}>

                <ListProjet titre={"Tous les projets"} stat={nb} s={"Tous"} />

                {
                    projetsData.map((p, index) => (
                        <ListProjet key={index} titre={p.titre} stat={p.stat} s={p.s} />
                    ))
                }



            </View>

            <BottomMenu navigation={navigation} />

        </>
    )

}


export default Acceuil