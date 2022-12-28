import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useContext } from 'react'
import { ActivityIndicator, FlatList, View, ScrollView, Text, TouchableHighlight, SafeAreaView } from 'react-native'
import { AppContext } from '../../App'
import TERM_JOIN_ALL from '../../graphql/query/term_join_all'

const UserTerm = () => {
  const navigation= useNavigation()
  const {uid}= useContext(AppContext)
  const {data, loading, error}= useQuery(TERM_JOIN_ALL, ({
    variables: {
        id_user: uid || ""
    },
    fetchPolicy: "network-only"
  }))
  const renderFormatDate= (date)=> {
    return (
        <Text style={{fontSize: 17, fontWeight: "600"}}>{moment(date).format("DD-MM-YYYY")}</Text>
    )
  }
  return (
    <ScrollView>
        {
            loading=== true && <ActivityIndicator size={"large"} color={"#2e89ff"} />
        }
        {
            loading=== false && <SafeAreaView>
                <ScrollView>
                <FlatList data={data?.term_join_all?.data_own} renderItem={({item, index, separators})=> <View key={index}>
                    <TouchableHighlight underlayColor={"unset"} onPress={()=> navigation.navigate("Term", {id_term: item.id_term, title: item.title})}>
                        <View style={{padding: 10, marginBottom: 12, backgroundColor: "#d9d9d9", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: 'center', flexDirection: "row"}}>
                            <View>
                                <Text style={{fontSize: 17, fontWeight: "600", marginBottom: 12}}>{item.title}</Text>
                                <Text numberOfLines={1} style={{fontSize: 15, overflow: "hidden", maxWidth: 200}}>{item.description}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 17, fontWeight: "600", marginBottom: 12}}>Created</Text>
                                <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    {renderFormatDate(item?.time_created)}
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            } />
                </ScrollView>
            </SafeAreaView>
        }
    </ScrollView>
  )
}

export default UserTerm
