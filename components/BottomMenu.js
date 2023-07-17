import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function BottomMenu({navigation, refresh}) {
    const [activeButton, setActiveButton] = useState('home');
    const [isActive, setIsActive] = useState(false);
    const handleDetailPress = (buttonName) => {
        setIsActive(true);
        setActiveButton(buttonName);

    };
    const handleHomePress = (buttonName) => {
        setIsActive(true);
        setActiveButton(buttonName);
        navigation.navigate("Acceuil")
        refresh
    }
    const handleLogoutPress = (buttonName) => {
        setIsActive(true);
        setActiveButton(buttonName);
        navigation.navigate("Login")
    }

    return (
        <>
            <View style={styles.menu}>
                <View style={{ alignItems: 'center' }}>
                    <IconButton
                        icon={<Icon name="format-list-bulleted" style={[styles.icon, activeButton === 'dots-vertical' && styles.activeButton]} />}
                        onPress={() => handleDetailPress('dots-vertical')}
                    />
                    <Text style={[styles.legend, activeButton === 'dots-vertical' && { color: '#49c322' }]}>Tous les projets</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <IconButton
                        icon={<Icon name="home" style={[styles.icon, activeButton === 'home' && styles.activeButton]} />}
                        onPress={() => handleHomePress('home')}
                    />
                    <Text style={[styles.legend, activeButton === 'home' && { color: '#49c322' }]}>Home</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <IconButton 
                        icon={<Icon name="logout" style={[styles.icon, activeButton === 'account' && styles.activeButton]} />}
                        onPress={() => handleLogoutPress('account')}
                    />
                    <Text style={[styles.legend, activeButton === 'account' && { color: '#49c322' }]}>Logout</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    menu: {
        position: 'relative',
        marginBottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        bottom: 0,
        backgroundColor: 'white',
        elevation: 20,
    },
    icon: {
        fontSize: 30,
    },
    activeButton: {
        color: '#49c322',
    },
    legend: {
        marginTop: -6,
        fontSize: 10,
        marginBottom: 20
    },
    activeLegend: {
        marginTop: -6,
        fontSize: 10,
        marginBottom: 20,
        color: '#49c322'
    }
});