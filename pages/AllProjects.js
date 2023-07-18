import { Alert, ScrollView, View, Text, TouchableOpacity } from "react-native"
import BottomMenu from "../components/BottomMenu"
import ProjectCard from "../components/ProjectCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { AppBar } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'


const AllProjects = ({ navigation, route }) => {

    const [projetsData, setProjetsData] = useState([])
    const [projetStatData, setProjetStatData] = useState([])
    const [nb, setNb] = useState('')
    const [openAjoutModal, setOpenAjoutModal] = useState(false)

    useEffect(() => {
        getAllPro()
        getNbPro()
    }, [])

    const getAllPro = async () => {
        const response = await axios.get(`http://192.168.1.198:5555/allData`)
        const data = response.data
        setProjetsData(data)
        setProjetStatData(data)
    }

    const getAllProStat = async (stat) => {
        const response = await axios.get(`http://192.168.1.198:5555/proStatData/${stat}`)
        const data = response.data
        setProjetStatData(data)
    }

    const getNbPro = async () => {
        const response = await axios.get(`http://192.168.1.198:5555/nbPro`)
        const data = response.data
        setNb(data[0].nb)
    }

    return (
        <>
            <AppBar title={"Tous les projets ( " + nb + " )"} color="blue" height={70} trailing={
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Icon name='plus' size={30} style={{ margin: 10 }} color='white' onPress={() => {
                        setOpenAjoutModal(true)
                    }} />

                    <Icon name='refresh' size={30} style={{ margin: 10 }} color='white' onPress={() => {
                        getAllPro()
                        getNbPro()
                    }} />

                </View>

            } />
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', margin: 10 }}>
                <TouchableOpacity onPress={() => { getAllProStat("En cours") }} >
                    <Text><Icon name='circle' color='blue' /> En cours</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { getAllProStat("Suspendu") }}>
                    <Text><Icon name='circle' color='red' /> Suspendu</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { getAllProStat("Termine") }}>
                    <Text><Icon name='circle' color='green' /> Termine</Text>
                </TouchableOpacity>


            </View>

            <ScrollView style={{ height: '90%' }}>
                {
                    projetStatData.map((p, index) => (
                        <ProjectCard key={index} id={p.id} titre={p.titre} stat={p.stat} resp={p.resp} bud={p.bud} navigation={navigation} />
                    ))
                }


            </ScrollView>

            <Modal isVisible={openAjoutModal}>
                <View style={{ backgroundColor: 'white', padding: 16, }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }} >Ajouter un projet</Text>

                        <Icon name='times' size={30} onPress={() => { setOpenAjoutModal(false) }} />
                    </View>
                    <View>

                    </View>
                </View>

            </Modal>

            <BottomMenu navigation={navigation} />

        </>
    )

}


export default AllProjects