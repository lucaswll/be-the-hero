import React from 'react' //por conta do jsx (js dentro do html)

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator() //1a navegação criada, cadastrar agr as rotas dentro do AppStack

import Incidents from './pages/Incidents/index.js' //passado no AppStack.Screen, que recebe o componente das paginas
import Detail from './pages/Detail/index.js' //idem

export default function Routes(){ //ao inves do BrowserRouter, uso o NavigationContainer em volta das rotas; idem .Navigator
    return(
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}> 
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>

        </NavigationContainer>
    )
}