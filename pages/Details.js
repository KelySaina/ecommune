import { View,StyleSheet,Image,Button, ScrollView,Dimensions} from "react-native"
import { Text, AppBar } from "@react-native-material/core"
import BottomMenu from "../components/BottomMenu"


const Details = ({ navigation, route }) => {
    
    const par = route.params?.ID || 'Aucun paramètre trouvé';
    return (
        <>
        <AppBar title={"Details du projet: " + par} color="#111476" height={50} />

        <View>
            <Image 
                source={require('../assets/images/th.png')}
                style = {styles.image}
            />  
        </View>
        <ScrollView>
        <View style={styles.container}>
            <View style = {styles.section}>
                <Text style = {styles.title}> PLAN </Text> 
                    <Text style = {styles.sousTitle}>Objectifs</Text> 
                    <View style = {styles.SousSection}>
                        <Text style = {styles.contenuSoustitre}> voici l'objectif </Text> 
                    </View>
                    <Text style = {styles.sousTitle}>Ressources</Text> 
                    <View style = {styles.SousSection}>
                        <Text style = {styles.contenuSoustitre}> voici les ressources </Text> 
                    </View>
                    <Text style = {styles.sousTitle}>Etapes</Text> 
                    <View style = {styles.SousSection}>
                        <Text style = {styles.contenuSoustitre}> voici les étapes </Text> 
                    </View>
                    <Text style = {styles.sousTitle}>Responsables</Text> 
                    <View style = {styles.SousSection}>
                        <Text style = {styles.contenuSoustitre}> voici les responsables </Text> 
                    </View>
                    <Text style = {styles.sousTitle}>Etapes</Text> 
                    <View style = {styles.SousSection}>
                        <Text style = {styles.contenuSoustitre}> voici les étapes </Text> 
                    </View>
                
            </View>
            <View style = {styles.section}>
                <Text style = {styles.title}> MISE EN OEUVRE </Text> 
                    <Text style = {styles.contenuSoustitre}>
                        voici le mise en OEUVRE
                    </Text>
            </View>
            <View style = {styles.section}>
                <Text style = {styles.title}> EVALUATION </Text> 
                    <Text style = {styles.contenuSoustitre}>
                        voici l'évaluation
                    </Text>
            </View>
        </View>
        </ScrollView>
            <BottomMenu navigation={navigation} />
        </>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      
    },
    image:{
        marginTop: 20,
        alignSelf:"flex-start",
        width:'100%',
        height:200
    },
    space:{
        width:20,
        
    },
    section:
    {
        textAlign:'left',
    },
    title: {
        textAlign:'center',
        fontSize: 24,
        fontWeight: 'bold',
        color:'#1D8320',
        marginTop:10,
        padding:5,
        borderBottomColor: '#1D8320',
        borderBottomWidth: 1,
        borderTopColor: '#1D8320',
        borderTopWidth: 1,
    },
    sousTitle: {
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:10,
        color:'#900C3F',
        textDecorationLine:'underline',
    },
    contenuSoustitre:{
        fontSize: 16,
        marginTop:10,
    }
  });

export default Details