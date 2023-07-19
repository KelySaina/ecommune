import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomMenu from "../components/BottomMenu";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { AppBar } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

const AllProjects = ({ navigation, route }) => {
    const [projetsData, setProjetsData] = useState([]);
    const [projetStatData, setProjetStatData] = useState([]);
    const [nb, setNb] = useState('');
    const [openAjoutModal, setOpenAjoutModal] = useState(false);

    const [errorVisible, setErrorVisible] = useState(false);


    // États pour stocker les valeurs des champs de texte et de date
    const [nomProjet, setNomProjet] = useState('');
    const [objProjet, setObjProjet] = useState('');
    const [responsable, setResponsable] = useState('');
    const [dateDebut, setDateDebut] = useState(null);
    const [budget, setbudget] = useState('');

    const handleBugdet = (text) => {
        // Supprimer les caractères non numériques et mettre à jour l'état
        const cleanedValue = text.replace(/[^0-9]/g, '');
        setbudget(cleanedValue);
    };

    // États pour gérer l'affichage du sélecteur de date
    const [showDateDebutPicker, setShowDateDebutPicker] = useState(false);
    useEffect(() => {
        getAllPro();
        getNbPro();
    }, []);

    const getAllPro = async () => {
        const response = await axios.get(`http://192.168.1.198:5555/allData`);
        const data = response.data;
        setProjetsData(data);
        setProjetStatData(data)
    };

    const getAllProStat = async (stat) => {
        const response = await axios.get(`http://192.168.1.198:5555/proStatData/${stat}`);
        const data = response.data;
        setProjetStatData(data);
    };

    const getNbPro = async () => {
        const response = await axios.get(`http://192.168.1.198:5555/nbPro`);
        const data = response.data;
        setNb(data[0].nb);
    };

    // Méthode pour ajouter le projet
    const addProjet = async () => {
        // Implémentez votre logique de connexion ici
        if (nomProjet == '' || responsable == '' || dateDebut == null) {
            setErrorVisible(true);
        } else {
            setErrorVisible(false);
            const response = await axios.post('http://192.168.1.198:5555/addProj', {
                nom: nomProjet,
                resp: responsable,
                dateDeb: dateDebut.toISOString().split('T')[0],
                budg: budget,
                obj: objProjet
            });
            closeModal();
        }
    };

    const closeModal = () => {
        setOpenAjoutModal(false);
        // Réinitialiser les champs de la modal
        setNomProjet('');
        setResponsable('');
        setDateDebut(null);
        setbudget(null);
        setObjProjet(null)
        // Réinitialiser l'affichage du sélecteur de date
        setShowDateDebutPicker(false);
    };

    const [openSearchModal, setOpenSearchModal] = useState(false)

    const [key, setKey] = useState('')

    const validerSearch = async () => {
        const response = await axios.get(`http://192.168.1.198:5555/searchKey/${key}`);
        const data = response.data;
        setProjetStatData(data);
        setOpenSearchModal(false)
    };


    const styles = StyleSheet.create({
        input: {
            width: '100%',
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            justifyContent: 'center',
            marginBottom: 10,
        },
        inputText: {
            fontSize: 16,
        },
        button: {
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 20,
        },
        buttonText: {
            color: 'white',
            fontSize: 18,
        },
    });
    return (
        <>
            <AppBar
                title={"Tous les projets ( " + nb + " )"}
                color="blue"
                height={70}
                trailing={
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Icon name='search' size={30} style={{ margin: 10 }} color='white' onPress={() => {
                            setOpenSearchModal(true)
                        }} />
                        <Icon name='plus' size={30} style={{ margin: 10 }} color='white' onPress={() => {
                            setOpenAjoutModal(true)
                        }} />

                        <Icon name='refresh' size={30} style={{ margin: 10 }} color='white' onPress={() => {
                            getAllPro()
                            getNbPro()
                        }} />

                    </View>
                }
            />
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { getAllProStat("En cours") }}>
                    <Text><Icon name='circle' color='blue' /> En cours</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { getAllProStat("Suspendu") }}>
                    <Text><Icon name='circle' color='red' /> Suspendus</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { getAllProStat("Termine") }}>
                    <Text><Icon name='circle' color='green' /> Termines</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ height: '90%' }}>
                {
                    projetStatData.map((p, index) => (
                        <ProjectCard key={index} id={p.id} titre={p.titre} stat={p.stat} resp={p.resp} d={p.d} navigation={navigation} />
                    ))
                }
            </ScrollView>
            <Modal isVisible={openSearchModal}>
                <View style={{ backgroundColor: 'white', padding: 16 }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rechercher un projet</Text>

                        <Icon name='times' size={30} onPress={() => { setOpenSearchModal(false) }} />
                    </View>
                    <Text style={{ fontWeight: "bold" }}>Rechercher</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ex: ID Projet, Nom Projet, Responsable, Date de debut"
                        value={key}
                        onChangeText={text => setKey(text)}
                    />

                    <TouchableOpacity onPress={validerSearch} style={styles.button}>
                        <Text style={styles.buttonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal isVisible={openAjoutModal}>
                <View style={{ backgroundColor: 'white', padding: 16 }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Ajouter un projet</Text>

                        <Icon name='times' size={30} onPress={closeModal} />
                    </View>
                    <View style={{ paddingTop: 16 }}>
                        {/* Zone "Plan" */}
                        <Text style={{ fontWeight: "bold" }}>Nom du projet</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ex: Construction de route..."
                            value={nomProjet}
                            onChangeText={text => setNomProjet(text)}
                        />
                        <Text style={{ fontWeight: "bold" }}>Objectif</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ex: Ameliorer le rendement"
                            value={objProjet}
                            onChangeText={text => setObjProjet(text)}
                        />
                        <Text style={{ fontWeight: "bold" }}>Responsable</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ex: Le Maire..."
                            value={responsable}
                            onChangeText={text => setResponsable(text)}
                        />
                        <Text style={{ fontWeight: "bold" }}>Budget en Ariary</Text>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.input}
                                value={budget}
                                onChangeText={handleBugdet}
                                keyboardType="numeric"
                            />
                        </View>
                        <Text style={{ fontWeight: "bold" }}>Date de début du projet</Text>
                        <TouchableOpacity onPress={() => setShowDateDebutPicker(true)}>
                            <View style={styles.input}>
                                <TextInput
                                    style={styles.inputText}
                                    value={dateDebut ? dateDebut.toISOString().slice(0, 10) : ''}
                                    editable={false} // Pour empêcher la saisie manuelle
                                />
                            </View>
                        </TouchableOpacity>
                        {showDateDebutPicker && (
                            <DateTimePicker
                                value={dateDebut || new Date()}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowDateDebutPicker(false);
                                    setDateDebut(selectedDate);
                                }}
                            />
                        )}
                        {errorVisible && <Text style={{ color: 'red', fontWeight: 'bold' }}>Veuillez saisir les champs vides.</Text>}
                        <TouchableOpacity onPress={addProjet} style={styles.button}>
                            <Text style={styles.buttonText}>Ajouter le projet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <BottomMenu navigation={navigation} />
        </>
    )
}


export default AllProjects;
