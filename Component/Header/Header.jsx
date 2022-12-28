import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from "react-native-vector-icons/MaterialIcons"
import Icon3 from "react-native-vector-icons/FontAwesome5"
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../App'

const Header = (props) => {
  const navigation= useNavigation()
  const [open, setOpen]= useState(false)
  const {auth}= useContext(AppContext)
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.navigate("Home")} style={styles.item}>
          <Icon name='home' color={"#000"} size={18} />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Activities")}  style={styles.item}>
          <Icon2 name='local-activity' color={"#000"} size={18} />
          <Text style={styles.text}>Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Classes")}  style={styles.item}>
          <Icon3 name='user-friends' color={"#000"} size={18} />
          <Text style={styles.text}>Classes</Text>
        </TouchableOpacity>
        {
          auth=== true && <TouchableOpacity onPress={()=> navigation.navigate("Profile")} style={[styles.item,styles.openPopup]}>
          <Icon3 onPress={()=> setOpen(prev=> !prev)} name='user' color={"#000"}  size={18}/>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        }
        {
          auth=== false && 
          <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={[styles.item,styles.openPopup]}>
            <Icon2 onPress={()=> setOpen(prev=> !prev)} name='login' color={"#000"}  size={18}/>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        }
    </View>
  )
}


const styles= StyleSheet.create({
    container: {
        marginTop: 40,
        width: "100%", 
        height: 60,
        display: "flex",
        justifyContent: "space-between", 
        alignItems: 'center',
        flexDirection: "row",
        padding: 10,
        position: "relative",
        zIndex: 99,
        
    },
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
      flexDirection: "row"
    },
    text: {
      marginLeft: 10,
      fontSize: 16
    },
    openPopup: {
      position: "relative",
      zIndex: 99999999,
    },
    popup: {
      position: "absolute",
      right: 0, 
      marginTop: 20,
      backgroundColor: "#fff",
      color: "#000",
      zIndex: 99999999,
      top: 0,
      padding: 10, borderRadius: 10, borderColor: "#d9d9d9",borderStyle: "solid", borderWidth: 1
      
    }
})

export default Header