import Login from "./pages/Login"
import Acceuil from "./pages/Acceuil"
import ProjetCard from "./components/ProjectCard"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'




const App = () => {

  const Stack = createNativeStackNavigator();


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProjetCard">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ProjetCard" component={ProjetCard} />
          <Stack.Screen name="Acceuil" component={Acceuil} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;
