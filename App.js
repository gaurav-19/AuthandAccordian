import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './src/screens/Splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/utils/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Introduction from './src/screens/Introduction';
import AccordianComp from './src/screens/AccordianComp';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = React.createContext({});

export const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem('my-token', value);
  } catch (e) {
    // saving error
  }
};

 export const getToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-token');
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    // error reading value
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem('my-token');
    await AsyncStorage.removeItem('my-data');
  } catch (e) {
    // error reading value
  }
};

  const Stack = createNativeStackNavigator();

  const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    useEffect(()=> {
      getToken().
      then(data => {
          if(data){
            setIsLoggedIn(true)
          } else{
            setIsLoggedIn(false);
          }
      })
      .catch(err => console.log(err))
  },[]);

    const theme = {
      colors:{
        background: colors.white
      }
    }
    return (
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme} >
          <Stack.Navigator>
            {isLoggedIn ? <>
            <Stack.Screen name="AccordianComp" component={AccordianComp} options={ {headerShown: false} }/>
            </> :
            <>
            <Stack.Screen name="Splash" component={Splash} options={ {headerShown: false} }/>
            <Stack.Screen name="Signin" component={Signin} options={ {headerShown: false} }/>
            <Stack.Screen name="Signup" component={Signup} 
            options={ {headerShown: false} }/>
            <Stack.Screen name="Introduction" component={Introduction} options={ {headerShown: false} }/>
            </>
          }
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      </UserContext.Provider>
    );
  }


export default App;
