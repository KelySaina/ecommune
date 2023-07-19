import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button, ScrollView, Dimensions, Alert, TextInput, TouchableOpacity } from "react-native"
import { Text, AppBar, ListItem } from "@react-native-material/core"
import BottomMenu from "../components/BottomMenu"
import axios from 'axios';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal';


const Details = ({ navigation, route }) => {
    const [detailInfo, setDetailInfo] = useState({
        Objectif: '',
        Etapes: '',
        titre: '',
        Responsable: '',
        Budget: ''
    });
    const [stepData, setStepData] = useState([]);
    const [stepStates, setStepStates] = useState([]);
    const [nomEtape, setNomEtape] = useState('');
    const [descEtape, setDescEtape] = useState('');



    const forceUpdate = () => {
        setStepData([...stepData]);
    };
    const par = route.params?.id || 'Aucun paramètre trouvé';
    const getDetai = async () => {
        try {
            const response = await axios.get(`http://192.168.1.198:5555/getAllPro/${par}`);
            const obj = response.data[0].Objectif;
            const step = response.data[0].Etapes;
            const t = response.data[0].Nom_Projet;
            const resp = response.data[0].Responsable;
            const budg = response.data[0].Budget;
            setDetailInfo({ Objectif: obj, Etapes: step, titre: t, Responsable: resp, Budget: budg });
        } catch (error) {
            console.error("Error getting details", error);
        }
    }
    const getStep = async () => {
        try {
            const response = await axios.get(`http://192.168.1.198:5555/getStep/${par}`);
            setStepData(response.data)
        } catch (error) {
            console.error("Error getting details", error);
        }
    };

    const [nbS, setNb] = useState('')

    const getNbStep = async () => {
        try {
            const response = await axios.get(`http://192.168.1.198:5555/getNbStep/${par}`);
            const data = response.data[0].nb
            setNb(data)
        } catch (error) {
            console.error("Error getting details", error);
        }
    };

    useEffect(() => {
        getDetai();
        getStep();
        getNbStep();

    }, [detailInfo])
    const [isChecked, setChecked] = useState(false);

    const handleToggle = async (index) => {
        const newStepData = [...stepData];
        const updatedStep = newStepData[index];
        updatedStep.EtatStep = updatedStep.EtatStep === 1 ? 0 : 1;
        setStepData(newStepData);

        try {
            // Faites la requête PUT avec les nouvelles données mises à jour
            await axios.post(`http://192.168.1.198:5555/putStep`, {
                updatedStep: updatedStep.EtatStep,
                projetId: `${par}`,
                idE: updatedStep.Id_Etape
            });
        } catch (error) {
            console.error("Error updating step", error);
        }

        getDetai();
        getStep();
        getNbStep();

    };

    const [addStepMod, setAddStepMod] = useState(false)

    const addEtape = async () => {
        const response = await axios.post(`http://192.168.1.198:5555/addEtape`, {
            nom: nomEtape,
            desc: descEtape,
            etat: 0,
            idPro: par
        })
        const data = response.data
        Alert.alert("Info", data)
        setAddStepMod(false)
        getDetai();
        getStep();
        getNbStep();

    }

    return (
        <>
            <View>

                <AppBar title={"Details du projet: " + par} color="#111476" height={50} />
                <View style={{ height: '85%' }}>


                    <View style={styles.header}>
                        <Text style={[styles.title2, { color: '#2196F3' }]}>{detailInfo.titre}</Text>
                    </View>
                    <ScrollView  >
                        <View style={styles.container}>
                            <View style={styles.section}>
                                <Text style={styles.title}> PLAN </Text>
                                <ListItem title='OBJECTIF' secondaryText={detailInfo.Objectif} />
                                <ListItem title='RESPONSABLE' secondaryText={detailInfo.Responsable} />
                                <ListItem title='RESSOURCES' secondaryText='ressource' />

                            </View>
                            <View style={styles.section}>
                                <Text style={styles.title}> MISE EN OEUVRE </Text>
                                <ListItem title='BUDGET' secondaryText={detailInfo.Budget + ' Ar'} />
                                <ListItem title={(
                                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text>ETAPES ({nbS})</Text>
                                    </View>
                                )} secondaryText={
                                    <View>
                                        {stepData.map((t, i) => (
                                            <View key={i}>
                                                <Text style={{ fontWeight: 'bold' }}>{t.Nom_Etape}</Text>
                                                <Text>{t.Description.split(':').join('\n')}</Text>
                                            </View>
                                        ))}
                                    </View>}
                                    onLongPress={() => { setAddStepMod(true) }}
                                />
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.title}> EVALUATION </Text>
                                <View >
                                    {stepData.map((item, index) => (
                                        <View key={index} style={{ margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text>{item.Nom_Etape}</Text>
                                            <CheckBox
                                                value={item.EtatStep}
                                                checked={item.EtatStep === 1}
                                                onPress={() => handleToggle(index)}
                                            />

                                        </View>
                                    ))}

                                </View>

                                {/* <View style={styles.contenuSoustitre3}>

                            {detailInfo.Etapes.split(':').map((t, i) => (<Text key={i} style={{ color: '#2196F3' }}>{t}</Text>))}
                        </View> */}
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <BottomMenu navigation={navigation} />
                <View>
                    <Modal isVisible={addStepMod}>
                        <View style={{ backgroundColor: 'white', padding: 16 }}>
                            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Ajouter une etape</Text>
                                <Icon name='times' size={30} onPress={() => { setAddStepMod(false) }} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: "bold" }}>Nom de l'etape</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="ex: Etape 1"
                                    value={nomEtape}
                                    onChangeText={text => setNomEtape(text)}
                                />
                                <Text style={{ fontWeight: "bold" }}>Description de l'etape</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="ex: Description1:Description2"
                                    value={descEtape}
                                    onChangeText={text => setDescEtape(text)}
                                />

                                <TouchableOpacity onPress={addEtape} style={styles.button}>
                                    <Text style={styles.buttonText}>Ajouter l'etape</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

        </>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    title2: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    space: {
        width: 20,

    },
    section:
    {
        textAlign: 'left',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D8320',
        marginTop: 10,
        padding: 5,
        borderBottomColor: '#1D8320',
        borderBottomWidth: 4,
        borderLeftColor: '#1D8320',
        borderLeftWidth: 10
    },
    sousTitle: {
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#900C3F',
        textDecorationLine: 'underline',
    },
    contenuSoustitre: {
        fontSize: 16,
        marginTop: 10,
    },
    contenuSoustitre2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    contenuSoustitre3: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: '#2196F3'
    },
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

export default Details