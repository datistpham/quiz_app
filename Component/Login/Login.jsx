import { useLazyQuery, useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator, ScrollView } from 'react-native'
import { AppContext } from '../../App'
import confirm_code from '../../graphql/mutation/confirm_code'
import CHECK_ACCOUNT_VALID from '../../graphql/query/check_account_valid'

const Login = () => {
  const [email, setEmail]= useState("")
  const [code, setCode]= useState("")
  const [password, setPassword]= useState("")
  const navigation= useNavigation()
  const [checkEmail, {data, loading, error}]= useLazyQuery(CHECK_ACCOUNT_VALID, ({
    variables: {
        email: email
    },
    fetchPolicy: "network-only"
  }))
  const checkVerifyCode= ()=> {
    
  }
  return (
    <ScrollView>
        <View style={styles.container}>
            {
                (!data || data?.check_account_valid?.is_valid=== false) && 
                <View style={[styles.container, {marginTop: 50}]}>
                    <Text style={{textAlign: "center", fontWeight: "600", fontSize: 20}}>
                        Login
                    </Text>
                    <TextInput
                        style={[styles.input, {borderRadius: 10}]}
                        onChangeText={setEmail}
                        value={email}
                        placeholder={"Type your email"}
                        
                    />
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {
                            loading=== true && <ActivityIndicator size={"large"} color={"#2e89ff"} />
                        }
                        {
                            loading=== false &&
                            <Button
                                onPress={()=> checkEmail()}
                                title="Login"
                                color="#2e89ff"
                                style={{borderRadius: 10}}
                                accessibilityLabel="Login"
                            />
                        }
                        {
                            error && <Text>{error.message}</Text>
                        }
                        {
                            data?.check_account_valid?.is_valid=== false && <Text style={{color: "red", fontSize: 15, marginTop: 12}}>Email is invalid. Please try again</Text>
                        }
                    </View>
                </View>
            }
            {
                data?.check_account_valid?.is_valid=== true &&
                <VerifyLogin email={email} code={code} setCode={setCode} />
            }
        </View>
    </ScrollView>
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

export default Login

const VerifyLogin= (props)=> {
    const {setUid, setUser, setAuth}= useContext(AppContext)
    const [result, setResult]= useState()
    const [verifyCode, {data, loading, error}]= useMutation(confirm_code, ({
        variables: {
            email: props?.email,
            verify_code: props?.code
        },
        fetchPolicy: "network-only"
    }))
    const login= async ()=> {
        await verifyCode()
        .then(data=> {
            setResult(data)
            setUid(data?.data?.confirmCode?.uid)
            setUser(data?.data?.confirmCode)
            if(data?.data?.confirmCode?.uid && data?.data?.confirmCode?.uid?.length > 0) {
                setAuth(true)
            }
        })
    }
    return (
        <View style={{marginTop: 50}}>
            <Text style={{textAlign: "center", fontWeight: "600", fontSize: 18}}>
                We've just sent your email a code verify. Type code to below and complete login process
            </Text>
            <TextInput
                style={[styles.input, {borderRadius: 10}]}
                onChangeText={props?.setCode}
                value={props?.code}
                placeholder={"Type code verification to login"}
            />
            <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button
                    onPress={login}
                    title="Confirm"
                    color="#2e89ff"
                    style={{borderRadius: 10}}
                    accessibilityLabel="Confirm"
                />
                {
                    data?.confirm_code?.is_verify=== false && <Text>Code verification is incorrect, try again   </Text>
                }
                {error && <Text>{error.message}</Text>}
            </View>
        </View>
    )
}
