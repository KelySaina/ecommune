import Login from "./pages/Login"
import Acceuil from "./pages/Acceuil"
import Details from "./pages/Details"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'




const App = () => {

  const Stack = createNativeStackNavigator();


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Details">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Acceuil" component={Acceuil} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;
