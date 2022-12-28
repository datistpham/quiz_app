import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableHighlight, View, LogBox } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AppContext } from '../../App'
import USERLOGIN from '../../graphql/query/user_login'
import UserTerm from './UserTerm'

const Profile = () => {
  const {setAuth, setUid, setUser}= useContext(AppContext)
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  const navigation= useNavigation()
  const {uid}= useContext(AppContext)
  const {data, error, loading}= useQuery(USERLOGIN, ({
    variables: {
      uid: uid || ""
    }
  }))
  const [openTerm, setOpenTerm]= useState(false)
  const logout= ()=> {
    setAuth(false)
    setUser(undefined)
    setUid("")
  }
  return (
    <ScrollView>
      <View style={{padding: 10}}>
        {
          loading=== true && <ActivityIndicator size={"large"} color={"#2e89ff"} />
        }
        {
          loading=== false && <View>

            <View style={{marginTop: 12, padding: 10, borderRadius: 10, backgroundColor: "#fff", marginBottom: 12}}>
              <Text style={{fontSize: 24, fontWeight: "600", textAlign: "center", marginBottom: 12}}>
                Profile
              </Text>
              <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 12}}>
                  <Image style={{width: 100, height: 100, borderRadius: 50}} source={{uri: data?.userLogin?.photoURL}} />
                </View>
                <Text style={{fontWeight: "600", fontSize: 18}}>{data?.userLogin?.displayName}</Text>
              </View>
              <View style={{padding: 10}}>
                <TouchableHighlight underlayColor={"#2e89ff"} style={{borderRadius: 10}} onPress={()=> setOpenTerm(prev=> !prev)}>
                  <View style={{display: "flex", flexDirection: 'row', alignItems: "center"}}>
                    <Text style={{fontSize: 17, fontWeight: "600", padding: 10}}>Your term</Text>
                    {
                      openTerm=== true && <Icon name={"arrow-drop-down"} size={18} />
                    }
                    {
                      openTerm=== false && <Icon name={"arrow-drop-up"} size={18} />
                    }
                  </View>
                </TouchableHighlight>
                {
                  openTerm=== true && <UserTerm />
                }
              </View>
            </View>
            <View style={{marginTop: 12, padding: 10, borderRadius: 10, marginBottom: 12, backgroundColor: "#fff"}}>
              <Text style={{fontSize: 24, fontWeight: "600", textAlign: "center", marginBottom: 12}}>
                Action
              </Text>
              <TouchableHighlight onPress={()=> navigation.navigate("CreateTerm")} underlayColor={"#2e89ff"} style={{borderRadius: 10, padding: 10, backgroundColor: "#d9d9d9"}}>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 10}}>
                  <Text style={{fontSize: 17}}>Create term</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{marginTop: 12, padding: 10, borderRadius: 10, backgroundColor: "#fff", marginBottom: 12}}>
              <Text style={{fontSize: 24, fontWeight: "600", textAlign: "center", marginBottom: 12}}>
                Settings
              </Text>
              <TouchableHighlight underlayColor={"#2e89ff"} style={{borderRadius: 10}} onPress={logout}>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: "#d9d9d9", borderRadius: 10}}>
                  <Text style={{fontSize: 17}}>Logout</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        }
      </View>
    </ScrollView>
  )
}

export default Profile
