import { ScrollView, View, Text } from "react-native"
import BottomMenu from "../components/BottomMenu"
import ProjectCard from "../components/ProjectCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { AppBar } from "@react-native-material/core";


const AllProjects = ({ navigation, route }) => {

    const [projetsData, setProjetsData] = useState([])
    const [nb, setNb] = useState('')

    useEffect(() => {
        getAllPro()
        getNbPro()
    }, [])

    const getAllPro = async () => {
        const response = await axios.get(`http://192.168.43.224:5555/allData`)
        const data = response.data
        setProjetsData(data)
    }

    const getNbPro = async () => {
        const response = await axios.get(`http://192.168.43.224:5555/nbPro`)
        const data = response.data
        setNb(data[0].nb)
    }

    return (
        <>
            <AppBar title={"Tous les projets ( " + nb + " )"} color="blue" height={70} />

            <ScrollView style={{ height: '90%' }}>
                {
                    projetsData.map((p, index) => (
                        <View>
                        <ProjectCard key={index} ID={p.id} titre={p.titre} stat={p.stat} resp={p.resp} navigation={navigation} route={route}/>
                        </View>
                    ))
                }


            </ScrollView>

            <BottomMenu navigation={navigation} />

        </>
    )

}


export default AllProjects