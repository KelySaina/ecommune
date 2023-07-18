import Login from "./pages/Login"
import Acceuil from "./pages/Acceuil"
import Card from "./components/ProjectCard"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'




const App = () => {

  const Stack = createNativeStackNavigator();


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Card">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Acceuil" component={Acceuil} />
          <Stack.Screen name="Card" component={Card} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;
