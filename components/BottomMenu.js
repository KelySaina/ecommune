import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function BottomMenu({ navigation, route }) {
    const handleDetailPress = (buttonName) => {
        navigation.navigate("AllProjects", { route })

    };
    const handleHomePress = (buttonName) => {
        navigation.navigate("Acceuil")

    }
    const handleLogoutPress = (buttonName) => {
        navigation.navigate("Login")
    }

    return (
        <>
            <View style={styles.menu}>
                <View style={{ alignItems: 'center' }}>
                    <IconButton
                        icon={<Icon name="format-list-bulleted" style={styles.icon} />}
                        onPress={() => handleDetailPress('dots-vertical')}
                    />
                    <Text style={styles.legend}>Projets</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <IconButton
                        icon={<Icon name="home" style={styles.icon} />}
                        onPress={() => handleHomePress('home')}
                    />
                    <Text style={styles.legend}>Acceuil</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <IconButton
                        icon={<Icon name="logout" style={styles.icon} />}
                        onPress={() => handleLogoutPress('account')}
                    />
                    <Text style={styles.legend}>Se deconnecter</Text>
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