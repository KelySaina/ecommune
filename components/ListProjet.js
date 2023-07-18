import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Text } from "@react-native-material/core"
import { useEffect } from "react"

const LsitProjet = ({ titre, stat, refresh }) => {

    useEffect(() => {
        refresh()
    }, [])

    return (
        <>
            <TouchableOpacity style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{titre}</Text>
                    <Text style={styles.statistic}>{stat}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#1D8320"
    },
    statistic: {
        fontSize: 30,
        marginTop: 5,
        color: "#1D2C83",
        fontWeight: "bold"
    },
});

export default LsitProjet