import { ListItem } from '@react-native-material/core';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Alert } from 'react-native';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';

const ProjectCard = ({ id, titre, stat, resp }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [cardAnim] = useState(new Animated.Value(0));
  const [openMarkModal, setOpenMarkModal] = useState(false)

  const handleCardPress = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(cardAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleModifier = async (value) => {
    const response = await axios.post(`http://192.168.43.224:5555/markPro`, {
      val: value,
      id: id
    })
    const data = response.data

    setOpenMarkModal(false)

    Alert.alert('Info', data)

  }

  const cardScaleY = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const detailOpacity = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const titleColor = isExpanded ? '#2196F3' : '#000';
  return (
    <>
      <View>

        {/* {<View>
        {data ? (
          <View>
            {data.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>} */}

        < TouchableOpacity style={styles.cardContainer} onPress={handleCardPress} >
          <View style={styles.card}>
            <View style={styles.header}>
              {/* <Image source={require(data["image"])} style={styles.image} /> */}
              <Text style={[styles.id, { color: titleColor }]}>{id}</Text>
              <Text style={[styles.title, { color: titleColor }]}>{titre}</Text>
            </View>
            {isExpanded && (
              <Animated.View style={[styles.detail, { transform: [{ scaleY: cardScaleY }], opacity: detailOpacity }]}>
                <ListItem title='Status' secondaryText={stat} />
                <ListItem title='Responsable' secondaryText={resp} />

                <TouchableOpacity style={styles.detailButton}>
                  <Text style={styles.detailButtonText}>Détails</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.detailButton} onPress={() => { stat === "Termine" ? null : setOpenMarkModal(true) }}  >
                  <Text style={styles.detailButtonText}>Marquer</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </TouchableOpacity >
      </View >

      <Modal isVisible={openMarkModal}>
        <View style={{ backgroundColor: 'white', padding: 16, }}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ fontSize: 18 }} >Marquer le projet '{id}' comme:</Text>

            <Icon name='times' size={30} onPress={() => { setOpenMarkModal(false) }} />
          </View>
          <View>
            <ListItem title='En cours' leading={<Icon name='circle' color='rgb(164,189,45)' />} onPress={() => { handleModifier("En cours") }} />
            <ListItem title='Suspendu' leading={<Icon name='circle' color='red' />} onPress={() => { handleModifier("Suspendu") }} />
            <ListItem title='Termine' leading={<Icon name='circle' color='green' />} onPress={() => { handleModifier("Termine") }} />
          </View>
        </View>

      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  card: {
    width: 350,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detail: {
    marginTop: 16,
  },
  detailText: {
    color: '#000',
    marginBottom: 8,
  },
  detailButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProjectCard;
