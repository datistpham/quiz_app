import { useQuery } from '@apollo/client'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CHECK_USER_JOIN_ALL_CLASS from '../../graphql/query/check_user_join_all_class'

const Classes = () => {
  const {loading, error, data}= useQuery(CHECK_USER_JOIN_ALL_CLASS, ({
    variables: {
      id_user: "pKA5f0iiDggxDIdbv6RC6ZFXmP42"
    },
    fetchPolicy: "network-only"
  }))
  return (
    <View style={styles.container}>
      {
        loading=== true && <ActivityIndicator size={"large"} color={"#2e89ff"} />
      }
      {
        loading=== false && 
        <>
        {
          data?.check_user_join_all_class?.length=== 0 && <View>
              <Text style={styles.text1}>You haven't join any classes yet.</Text>
              
            </View>
            }
            <View>
              {data?.check_user_join_all_class?.length > 0 &&
                <FlatList data={data?.check_user_join_all_class} renderItem={({item})=> <TouchableOpacity onPress={()=> navigation.navigate("Term")} style={styles.item}>
                  <View>
                    <Text style={styles.text2}>{item.title}</Text>
                  </View>
                  <View>
                    <Text>
                      <Text numberOfLines={1} style={{fontWeight: "600", overflow: "hidden"}}>Description: </Text><Text>{item.description}</Text>
                    </Text>
                  </View>
                  
                  <View style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                    <Text style={{fontWeight: "600", marginRight: 10}}>Author: </Text>
                    <View style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                      <Image style={{width: 28, height: 28, borderRadius: 14}} source={{uri: item.photoURL}} />
                      <Text style={{fontWeight: "600", marginLeft: 12}}>{item.displayName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>} />
              }
            </View>
          </>
        }
      </View>
  )
}

const styles= StyleSheet.create({
  container: {
    flex: 1, 
    display: "flex",
    justifyContent: 'center', 
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    marginTop: 12
  },
  text1: {
    fontSize: 18,
    marginTop: 12
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },  
  item: {
    width: "50%",
    padding: 10,
    borderRadius: 10, 
    borderStyle: "solid",
    borderColor: "#d9d9d9",
    borderWidth: 1,
    backgroundColor: "#fff"

  }
})

export default Classes