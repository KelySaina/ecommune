import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageCropPicker from 'react-native-image-crop-picker'; // Import the ImageCropPicker library
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

  // États pour stocker les valeurs des champs de texte et de date
  const [nomProjet, setNomProjet] = useState('');
  const [responsable, setResponsable] = useState('');
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [imagePath, setImagePath] = useState('');

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
  const addProjet = () => {
    // Ici, vous pouvez implémenter la logique pour ajouter le projet à votre backend
    // Vous pouvez utiliser les valeurs des états nomProjet, responsable, dateDebut, dateFin, et imagePath
    // Une fois que le projet est ajouté, vous pouvez fermer la modal et rafraîchir la liste des projets
    closeModal();
  };

  const closeModal = () => {
    setOpenAjoutModal(false);
    // Réinitialiser les champs de la modal
    setNomProjet('');
    setResponsable('');
    setDateDebut(null);
    setDateFin(null);
    setImagePath('');
  };

  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.7
    }).then(image => {
      // Handle the selected image here
      console.log("Image selected: ", image.path);
      setImagePath(image.path); // Set the selected image path to the state
    }).catch(error => {
      console.log("Error selecting image: ", error);
    });
  };

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
            <Text style={{ fontSize: 18 }}>Ajouter un projet</Text>

            <Icon name='times' size={30} onPress={closeModal} />
          </View>
          <View>
            {/* Zone "Plan" */}
            <TextInput
              style={styles.input}
              placeholder="Nom du projet"
              value={nomProjet}
              onChangeText={text => setNomProjet(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Responsable"
              value={responsable}
              onChangeText={text => setResponsable(text)}
            />
            <TouchableOpacity onPress={() => setDateDebut(new Date())}>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Date de début du projet"
                  value={dateDebut ? dateDebut.toISOString().slice(0, 10) : ''}
                  editable={false} // Pour empêcher la saisie manuelle
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDateFin(new Date())}>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Date de fin du projet"
                  value={dateFin ? dateFin.toISOString().slice(0, 10) : ''}
                  editable={false} // Pour empêcher la saisie manuelle
                />
              </View>
            </TouchableOpacity>
            <Text>Image du projet</Text>
            {imagePath ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: imagePath }} style={styles.image} />
              </View>
            ) : null}
            <TouchableOpacity onPress={openImagePicker} style={styles.button}>
              <Text style={styles.buttonText}>Ajouter une image</Text>
            </TouchableOpacity>
            {/* Bouton pour ajouter le projet */}
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

const styles = StyleSheet.create({
  input: {
    width: '80%',
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default AllProjects;
