import { useNavigation } from "@react-navigation/native";
import React, { useContext, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppContext } from "../../App";
import { API_URL } from "../../config";
import Category from "./Category";
import uuid from "react-native-uuid";


const CreateTerm = () => {
  const {uid}= useContext(AppContext)
  const refRBSheet= useRef()
  const refRbSheet2= useRef()
  const navigation= useNavigation()
  const [titleTerm, setTitleTerm]= useState("")
  const [description, setDescription]= useState("")
  const [category, setCategory]= useState("math")
  const [permission, setPermission]= useState({
    editable: 1,
    visible: 1
  })
  const titleValid= titleTerm?.length > 0 ? true : false
  const [currentQuestion, setCurrenQuestion]= useState(1)
  const [listQuestion, setListQuestion]= useState([])
  const createTermApi= ()=> {
    const id_term= uuid.v4()
    fetch(API_URL+ "/api/v1/create/term", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: titleTerm,
            category: category,
            description: description,
            editable: permission.editable,
            visible: permission.visible,
            own_id: uid,
            question: listQuestion,
            id_term: id_term
        })
    })
    .then(response=> response.json())
    .then(responseJson=> {
        return navigation.navigate("Term", {id_term: id_term, title: titleTerm})
    })
  }
  return (
    <View style={{flex: 1}}>
        <ScrollView style={{padding: 10, marginBottom: 12}}>
            <KeyboardAvoidingView behavior='height'>
                <View
                    style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 50,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 12
                    }}
                >
                    <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                    >
                    <TouchableHighlight onPress={() => navigation.goBack(-1)}>
                        <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                        >
                        <Icon name={"keyboard-arrow-left"} size={15} />
                        <Text style={{ marginLeft: 12 }}>Back</Text>
                        </View>
                    </TouchableHighlight>
                    </View>
                    <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                    >
                    <Text
                        style={{ fontSize: 16, fontWeight: "600", textAlign: "center" }}
                    >
                        {
                            titleValid=== true ? titleTerm : "Create term"
                        }
                    </Text>
                    </View>
                    <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                    >
                    <TouchableHighlight
                        onPress={() => navigation.goBack(-1)}
                        style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        borderColor: "#d9d9d9",
                        borderStyle: "solid",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        }}
                    >
                        <Icon name="close" size={24} />
                    </TouchableHighlight>
                    </View>
                </View>
                <View style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, marginTop: 12}}>
                    <Text style={{fontSize: 17, fontWeight: "600", marginBottom: 12}}>Create new term</Text>
                    <ComponentInput title={"Title"} setValue={setTitleTerm} value={titleTerm} placeholder={`Enter title, ex: "Biology - 22 Chapter: Evolution"`} />
                    <ComponentInput title={"Description"} setValue={setDescription} value={description} placeholder={`Enter description...`} />
                    <Category setCategory={setCategory} category={category} />
                    <View style={{display: "flex", alignItems: 'center', flexDirection: "row", width: "100%"}}>
                        <Text style={{fontSize: 15}}>Who can see this term</Text>
                        <TouchableHighlight onPress={()=> refRBSheet.current.open()} style={{marginLeft: 12, borderRadius: 10}} underlayColor={"#2e89ff"}>
                            <View>
                                {
                                    permission.visible=== 1 && <View style={{display: "flex", justifyContent: "center", alignItems: "center" ,flexDirection: "row", borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 10}}>
                                    <Icon name={"public"} size={18} />
                                    <Text style={{marginLeft: 8}}>Everyone</Text>
                                </View>
                                }
                                {
                                    permission.visible=== 2 && <View style={{display: "flex", justifyContent: "center", alignItems: "center" ,flexDirection: "row", borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 10}}>
                                    <Icon name={"lock-outline"} size={18} />
                                    <Text style={{marginLeft: 8}}>Only me</Text>
                                </View>
                                }
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{display: "flex", alignItems: 'center', flexDirection: "row", width: "100%", marginTop: 12}}>
                        <Text style={{fontSize: 15}}>Who can edit this term</Text>
                        <TouchableHighlight onPress={()=> refRbSheet2.current.open()} style={{marginLeft: 12, borderRadius: 10}} underlayColor={"#2e89ff"}>
                            <View>
                                <View style={{display: "flex", justifyContent: "center", alignItems: "center" ,flexDirection: "row", borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 10}}>
                                    <Icon name={"lock-outline"} size={18} />
                                    <Text style={{marginLeft: 8}}>Only me</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                    {/*  */}
                    <RBSheet
                        ref={refRBSheet}
                        height={100}
                        openDuration={250}
                        customStyles={{
                        container: {
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center"
                        },
                        }}
                    >
                        <View style={{width: "100%"}}>
                            <TouchableHighlight onPress={()=> {setPermission(prev=> ({...prev, visible: 1}));refRBSheet.current.close()}} underlayColor={"#2e89ff"}>
                                <View style={{display: "flex", justifyContent: "center", alignItem: "center", padding: 10, width: "100%"}}>
                                    <Text style={{textAlign: "center"}}>Everyone</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=> {setPermission(prev=> ({...prev, visible: 2}));refRBSheet.current.close()}} underlayColor={"#2e89ff"}>
                                <View style={{display: "flex", justifyContent: "center", alignItem: "center", padding: 10, width: "100%"}}>
                                    <Text style={{textAlign: "center"}}>Only me</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        {/*  */}
                    </RBSheet>
                    {/*  */}
                    <RBSheet
                        ref={refRbSheet2}
                        height={100}
                        openDuration={250}
                        customStyles={{
                        container: {
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center"
                        },
                        }}
                    >
                        <View style={{width: "100%"}}>
                            <TouchableHighlight onPress={()=> {setPermission(prev=> ({...prev, editable: 1}));refRbSheet2.current.close()}} underlayColor={"#2e89ff"}>
                                <View style={{display: "flex", justifyContent: "center", alignItem: "center", padding: 10, width: "100%"}}>
                                    <Text style={{textAlign: "center"}}>Only me</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </RBSheet>
                </View>
                {/*  */}
                <ScrollView>
                    <FlatList scrollEnabled={true} data={Array.from(Array(parseInt(currentQuestion)).keys())} renderItem={({item, index, separators})=> <View key={index}>
                        <View style={{ backgroundColor: "#fff", marginTop: 12, marginBottom: 12, borderRadius: 10}}>
                            <View style={{borderBottomColor: "#3a3b3c", borderBottomWidth: 2}}>
                                <View style={{padding: 10,width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                                        <Text style={{fontSize: 17, fontWeight: "600", color: "#000"}}>1</Text>
                                        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <Icon name={"delete"} size={18} />
                                        </View>
                                    </View>
                            </View>
                            <ComponentQuestion setCurrenQuestion={setCurrenQuestion} currentQuestion={currentQuestion} setListQuestion={setListQuestion} listQuestion={listQuestion} />
                        </View>
                        
                    </View>} />
                </ScrollView>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 12}}>
                    <TouchableHighlight style={{marginRight: 20}} onPress={createTermApi}>
                        <View style={{paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24, borderRadius: 10, backgroundColor: "#2e89ff"}}>
                            <Text style={{fontSize: 17, color: '#fff', fontWeight: "600"}}>Create term</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{marginLeft: 20}} onPress={()=> setCurrenQuestion(prev=> parseInt(prev) + 1)}>
                        <View style={{paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24, borderRadius: 10, backgroundColor: "#2e89ff"}}>
                            <Text style={{fontSize: 17, color: '#fff', fontWeight: "600"}}>Add more question</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                    
                {/*  */}
            </KeyboardAvoidingView>
        </ScrollView>
    </View>
  );
};

export default CreateTerm;

const ComponentInput= (props)=> {
    const [isFocus, setIsFocus]= useState(false)
    const handleFocus = () => setIsFocus(true)
    const handleBlur = () => setIsFocus(false)
    return (
        <View style={{marginBottom: 12}}>
            <TextInput onChangeText={props?.setValue} value={props?.value} placeholder={props?.placeholder} onBlur={handleBlur} onFocus={handleFocus} style={{marginBottom: 4, width: "100%", height: 40, borderBottomWidth: 2, borderBottomColor: isFocus=== true ? "#2e89ff" : "#d9d9d9"}} />    
            <Text style={{fontSize: 14}}>{props?.title}</Text>
        </View>
    )
}

const ComponentQuestion= (props)=> {
    const [question, setQuestion]= useState("")
    const [answer, setAnswer]= useState("")
    const [nextQuestion, setNextQuestion]= useState(false)
    const func= ()=> {
        setNextQuestion(true)
        props?.setListQuestion(prev=> ([...prev, {index: props?.currentQuestion, question: question.split("|").join("\n"), answer: answer}]))
    }
    return (
        <View >
            <View style={{marginTop: 12, padding: 10}}>
                <ComponentInput title={"Term"} value={question} setValue={setQuestion} />
            </View>
            <View style={{ padding: 10}}>
                <ComponentInput title={"Answer"} value={answer} setValue={setAnswer} />
            </View>
            {
                nextQuestion=== false && <View>
                <TouchableHighlight underlayColor={"unset"} onPress={func}>
                    <View style={{marginBottom: 12}}>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <View style={{paddingTop: 12, paddingBottom: 12, paddingRight: 24, paddingLeft: 24, borderRadius: 10, backgroundColor: "#2e89ff",}}>
                                <Text style={{fontSize: 17, fontWeight: "600", color: "#fff"}}>Save</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            }
        </View>
    )
}