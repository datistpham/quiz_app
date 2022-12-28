import { useQuery } from '@apollo/client'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableHighlight, View, Dimensions, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AppContext } from '../../../App'
import GET_TERM from '../../../graphql/query/get_term'

const Flashcards = () => {
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));
    const {uid}= useContext(AppContext)
    const navigation = useNavigation();
    const route= useRoute()
    const { data, error, loading } = useQuery(GET_TERM, {
        variables: {
            uid: uid || "",
            id_term: route.params?.id_term || "",
        },
        fetchPolicy: "network-only",
    });
    const [flip, setFlip]= useState(false)
    const [listQuestion, setListQuestion]= useState([])
    useEffect(()=> {
        setListQuestion(data?.get_term?.list_question)
    }, [data?.get_term?.list_question])
    const [currentQuestion, setCurrentQuestion]= useState(1)
    const progressComplete = parseFloat(
        (currentQuestion / listQuestion?.length || 0).toFixed(2)
      );
    const [autoPlay, setAutoPlay]= useState(false)
    const autoPlayQuestion= ()=> {
        setAutoPlay(prev=> !prev)
    }
    
    const playFunc= ()=> {
        
    }
    const pauseFunc= ()=> {
       
    }
    const nextQuestion= ()=> {
        if(parseInt(currentQuestion) === parseInt(listQuestion?.length)) {

        }
        else {
            setCurrentQuestion(prev=> parseInt(prev) + 1)
        }
    }
    const prevQuestion= ()=> {
        if(parseInt(currentQuestion) === 1) {

        }
        else {
            setCurrentQuestion(prev=> parseInt(prev) - 1)
        }
    }
    useEffect(()=> {
        let intervalPlay= setInterval(()=> {
            if(parseInt(currentQuestion) < listQuestion.length) {
                setCurrentQuestion(prev=> parseInt(prev) + 1)
            }
            else {
                return clearInterval(intervalPlay)
            }
        }, 1500)
        if(autoPlay=== true) {
            if(parseInt(currentQuestion) - 1 === listQuestion.length) {
                setCurrentQuestion(1)
            }
            intervalPlay
            
        }
        else {
            clearInterval(intervalPlay)
        }
        return ()=> clearInterval(intervalPlay)
    }, [autoPlay, currentQuestion])
  return (
    <SafeAreaView>
        {
            error && <ActivityIndicator size={"large"} color={"#2e89ff"} />
        }
        {
            loading=== true && <ActivityIndicator size={"large"} color={"#2e89ff"} />
        }
        {
            loading=== false && <View>
                <View style={{marginTop: 12, width: "100%", padding: 10, position: "relative"}}>
                    <View style={{width: "100%", display: 'flex', justifyContent: "space-between", alignItems: "center", height: 50, backgroundColor: "#fff", flexDirection: "row", borderRadius: 10, paddingLeft: 10, paddingRight: 10, marginBottom: 12}}>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <TouchableHighlight activeOpacity={1} underlayColor={"unset"} onPress={()=> navigation.goBack(-1)}>
                                <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                                    <Icon name={"keyboard-arrow-left"} size={15} />
                                    <Text style={{marginLeft: 12}}>Back</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <Text style={{fontSize: 16, fontWeight: "600", textAlign: "center"}}>Flashcards</Text>
                        </View>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <TouchableHighlight activeOpacity={1} underlayColor={"unset"} onPress={()=> navigation.goBack(-1)} style={{width: 40, height: 40, borderRadius: 10, borderColor: "#d9d9d9", borderStyle: "solid", display: "flex", justifyContent: "center", alignItems: "center", borderWidth: 1}}>
                                <Icon name='close' size={24} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{padding: 10, backgroundColor: "#fff", marginBottom: 12, borderRadius: 10}}>
                        <View style={{width: "100%", marginBottom: 8}}>
                            <ProgressBar
                                style={{ width: "100%" }}
                                progress={progressComplete}
                                color={"#4255ff"}
                            />
                        </View>
                        <View style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                            <Text>Progress</Text>
                            <Text>{currentQuestion}/{listQuestion?.length}</Text>
                        </View>
                    </View>
                    {
                        <FlatList data={listQuestion?.slice(parseInt(currentQuestion) - 1, parseInt(currentQuestion) )} renderItem={({item})=>  
                            <View style={{ borderRadius: 10, position: "relative"}}>
                                <TouchableHighlight activeOpacity={1} underlayColor={"unset"} onPress={()=> setFlip(prev=> !prev)}>
                                    <View style={{width: "100%", backgroundColor: "#fff", aspectRatio: 4 / 3, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: 0, left: 0, transform: [{rotateX: flip===true ? "270deg" : "0deg"}], opacity: flip === true ? 0 : 1}}>
                                        <View>
                                            <FlatList data={item?.question?.split("\n")} renderItem={({item, index, separators})=> <Text key={index}>
                                                {item}
                                            </Text>} />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight activeOpacity={1} underlayColor={"unset"} onPress={()=> setFlip(prev=> !prev)}>
                                    <View style={{width: "100%", backgroundColor: "#fff", aspectRatio: 4 / 3, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", transform: [{rotateX: flip===true ? "0deg" : "270deg"}], opacity: flip === true ? 1 : 0}}>
                                        <Text style={{fontWeight: "600"}}>{item?.answer}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>}
                        />
                    }
            
                <View style={{display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "row", marginTop: 12}}> 
                    <TouchableHighlight activeOpacity={1} underlayColor={"unset"} onPress={prevQuestion}>
                        <View style={{width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 20}}>
                            <Icon style={{marginLeft: 5}} name={"arrow-back-ios"} size={20} color={"#2e89ff"} />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={1} underlayColor={"unset"} onPress={nextQuestion}>
                        <View style={{width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 20}}>
                            <Icon name={"arrow-forward-ios"} size={20} color={"#2e89ff"} />
                        </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{backgroundColor: "#fff", height: 100, position: "absolute", top: Dimensions.get('window').height - 150, left: 0, width: '100%'}}>
                    <View style={{display: "flex", justifyContent: "space-between" ,alignItems: "center", flexDirection: "row", flex: 1}}>
                        <View style={{marginLeft: 20}}>
                            <View>
                                {
                                    autoPlay=== false && 
                                    <TouchableHighlight activeOpacity={1} underlayColor={"unset"} onPress={()=> {setAutoPlay(true);playFunc()}}>
                                        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <Icon name={"play-arrow"} size={28} color={"#2e89ff"} />
                                            <Text style={{marginTop: 8, fontSize: 13}}>Play</Text>
                                        </View>
                                    </TouchableHighlight>
                                }
                            </View>
                            <View>
                                {
                                    autoPlay=== true && 
                                    <TouchableHighlight activeOpacity={1} underlayColor={"unset"} onPress={()=> {setAutoPlay(false);pauseFunc()}}>
                                        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <Icon name={"pause"} size={28} color={"#2e89ff"} />
                                            <Text style={{marginTop: 8, fontSize: 13}}>Pause</Text>
                                        </View>
                                    </TouchableHighlight>
                                }
                            </View>
                        </View>
                        <TouchableHighlight style={{marginRight: 20}}>
                            <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Icon name={"shuffle"} size={28} color={"#2e89ff"} />
                                <Text style={{marginTop: 8, fontSize: 13}}>Shuffle</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        }
    </SafeAreaView>
  )
}

export default Flashcards
