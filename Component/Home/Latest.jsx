import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { styles } from './Home'

const Latest = (props) => {
  const navigation= useNavigation()

  return (
    <View style={{flex: 1 / 2}}>
        <TouchableOpacity onPress={()=> navigation.navigate("Term", {id_term: props?.id_term, title: props?.title})} style={[styles.item]}>
            <View style={{marginBottom: 24}}>
                <View>
                    <Text style={styles.text2}>{props?.title}</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={{overflow: "hidden"}}>
                        <Text style={{fontWeight: "600"}}>Description: </Text><Text>{props?.description}</Text>
                    </Text>
                </View>
                </View>
            <View style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                <Text style={{fontWeight: "600", marginRight: 10}}>Author: </Text>
                <View style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                    <Image style={{width: 28, height: 28, borderRadius: 14}} source={{uri: props?.photoURL}} />
                    <Text style={{fontWeight: "600", marginLeft: 12}}>{props?.displayName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default Latest
