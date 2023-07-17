import Login from "./pages/Login"
import Acceuil from "./pages/Acceuil"
import ListProjet from './components/ListProjet'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'




const App = () => {

  const Stack = createNativeStackNavigator();


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListProjet">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Acceuil" component={Acceuil} />
          <Stack.Screen name="ListProjet" component={ListProjet} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;
