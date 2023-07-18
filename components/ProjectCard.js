import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';
import { FlatList, Alert } from 'react-native';

const Card = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://192.163.43.42:5555/projets');
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cardAnim] = useState(new Animated.Value(0));

  const handleCardPress = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(cardAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

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

    <View>
      <View>
        {data ? (
          <View>
            {data.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      < TouchableOpacity style={styles.cardContainer} onPress={handleCardPress} >
        <View style={styles.card}>
          <View style={styles.header}>
            {/* <Image source={require(data["image"])} style={styles.image} /> */}
            <Text style={[styles.title, { color: titleColor }]}>Titre de la carte</Text>
          </View>
          {isExpanded && (
            <Animated.View style={[styles.detail, { transform: [{ scaleY: cardScaleY }], opacity: detailOpacity }]}>
              <Text style={styles.detailText}>Texte détaillé de la carte</Text>
              <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText}>Détail</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </TouchableOpacity >
    </View>
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
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
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
    marginTop: 8,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Card;
