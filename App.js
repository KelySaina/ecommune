import Login from "./pages/Login"
import Acceuil from "./pages/Acceuil"
import AllProjects from "./pages/AllProjects"
import Details from "./pages/Details"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const App = () => {

  const Stack = createNativeStackNavigator();


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: false, // Hide the header for all screens
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Acceuil" component={Acceuil} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="AllProjects" component={AllProjects} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;
