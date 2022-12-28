import { StyleSheet, Text, View, SafeAreaView  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Component/Home/Home";
import Header from "./Component/Header/Header";
import Activities from "./Component/Activities/Activities";
import Classes from "./Component/Classes/Classes";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import Term from "./Component/Term/Term";
import Profile from "./Component/Profile/Profile";
import Learn from "./Component/Term/Learn/Learn";
import Test from "./Component/Term/Test/Test";
import Flashcards from "./Component/Term/Flashcards/Flashcards";
import { createContext, useContext, useState } from "react";
import {API_URL} from "./config"
import "expo-dev-client"
import CreateTerm from "./Component/CreateTerm/CreateTerm";
const Stack = createNativeStackNavigator();
const link = new HttpLink({ uri: `${API_URL}/api/graphql` });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  
});
export const AppContext= createContext()
export default function App() {
  const [uid, setUid]= useState("")
  const [user, setUser]= useState()
  const [auth, setAuth]= useState(false)

  return (
    <AppContext.Provider value={{uid, setUid, setUser, setAuth, auth}}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Header />
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            {
              auth=== false && <>
                <Stack.Screen options={{headerShown: false}} name="Home" component={Login} />
                <Stack.Screen options={{headerShown: false}} name="Activities" component={Login} />
                <Stack.Screen options={{headerShown: false}} name="Classes" component={Login} />            
                <Stack.Screen options={{headerShown: false}} name={"Profile"} component={Login} />

              </>
            }
            {
              auth=== true && <>
                <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
                <Stack.Screen options={{headerShown: false}} name="Activities" component={Activities} />
                <Stack.Screen options={{headerShown: false}} name="Classes" component={Classes} />
                <Stack.Screen options={{headerShown: false}} name={"Profile"} component={Profile} />

              </>
            }
            <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
            <Stack.Screen options={{headerShown: false}} name="Signup" component={Signup} />
            <Stack.Screen options={{headerShown: false}} name="Term" component={Term} />
            <Stack.Screen options={{headerShown: false}} name={"Learn"} component={Learn} />
            <Stack.Screen options={{headerShown: false}} name={"Test"} component={Test} />
            <Stack.Screen options={{headerShown: false}} name={"Flashcards"} component={Flashcards} />
            <Stack.Screen options={{headerShown: false}} name={"CreateTerm"} component={CreateTerm} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
