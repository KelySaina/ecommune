import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomMenu from "../components/BottomMenu";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { AppBar } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

const AllProjects = ({ navigation, route }) => {
  const [projetsData, setProjetsData] = useState([]);
  const [nb, setNb] = useState('');
  const [openAjoutModal, setOpenAjoutModal] = useState(false);

  const [errorVisible, setErrorVisible] = useState(false);


  // États pour stocker les valeurs des champs de texte et de date
  const [nomProjet, setNomProjet] = useState('');
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
        budg:budget,
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
    // Réinitialiser l'affichage du sélecteur de date
    setShowDateDebutPicker(false);
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
        <Text><Icon name='circle' color='rgb(164,189,45)' /> En cours</Text>
        <Text><Icon name='circle' color='red' /> Suspendu</Text>
        <Text><Icon name='circle' color='green' /> Termine</Text>
      </View>

      <ScrollView style={{ height: '90%' }}>
        {
          projetsData.map((p, index) => (
            <ProjectCard key={index} id={p.id} titre={p.titre} stat={p.stat} resp={p.resp} navigation={navigation} />
          ))
        }
      </ScrollView>

      <Modal isVisible={openAjoutModal}>
        <View style={{ backgroundColor: 'white', padding: 16 }}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ fontSize: 18, fontWeight:'bold' }}>Ajouter un projet</Text>

            <Icon name='times' size={30} onPress={closeModal} />
          </View>
          <View  style={{ paddingTop: 16 }}>
            {/* Zone "Plan" */}
            <Text style={{fontWeight:"bold"}}>Nom du projet</Text>
            <TextInput
              style={styles.input}
              placeholder="ex: Construction de route..."
              value={nomProjet}
              onChangeText={text => setNomProjet(text)}
            />
            <Text style={{fontWeight:"bold"}}>Responsable</Text>
            <TextInput
              style={styles.input}
              placeholder="ex: Le Maire..."
              value={responsable}
              onChangeText={text => setResponsable(text)}
            />
            <Text style={{fontWeight:"bold"}}>Budget en Ariary</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                value={budget}
                onChangeText={handleBugdet}
                keyboardType="numeric"
              />
            </View>
            <Text style={{fontWeight:"bold"}}>Date de début du projet</Text>
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
            {errorVisible && <Text style={{color: 'red', fontWeight: 'bold'}}>Veuillez saisir les champs vides.</Text>}
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
