import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

const Signup = () => {
  const [account, setAccount]= useState("")
  const [password, setPassword]= useState("")
  const [confirmPassword, setConfirmPassword]= useState("")
  const navigation= useNavigation()
  return (
    <View style={styles.container}>
        <Text style={{textAlign: "center", fontWeight: "600", fontSize: 20}}>
            Signup
        </Text>
        <TextInput
            style={styles.input}
            onChangeText={setAccount}
            value={account}
            placeholder={"Type account"}
            
        />
        <TextInput
            keyboardType={"visible-password"}
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder={"Type password"}
        />
        <TextInput
            keyboardType={"visible-password"}
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder={"Type password"}
        />
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button
                title="Signup"
                color="#2e89ff"
                style={{borderRadius: 10}}
                accessibilityLabel="Signup"
            />
        </View>
        <View style={{marginTop: 12, marginBottom: 12}}>
            <Text style={{textAlign: "center"}}>You don't have account ?</Text>
        </View>
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button
                onPress={()=> navigation.navigate("Login")}
                title="Login"
                color="#2e89ff"
                style={{borderRadius: 10, width: 100}}
                accessibilityLabel="Login"
            />
        </View>
    </View>
  )
}

const styles= StyleSheet.create({
    container: {
        flex: 1, 
        display: "flex", 
        justifyContent: 'center', 
        alignContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "#2e89ff"
      },
})

export default Signup
