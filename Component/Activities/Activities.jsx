import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppContext } from "../../App";
import LEARNING_TERM from "../../graphql/query/learing_term";

const Activities = () => {
  const {uid}= useContext(AppContext)
  const navigation = useNavigation();
  const { data, loading, error } = useQuery(LEARNING_TERM, {
    variables: {
      id_user: uid || "",
    },
    fetchPolicy: "no-cache",
  });
  return (
    <View>
      <Text
        style={{
          fontWeight: "600",
          marginBottom: 12,
          fontSize: 24,
          marginTop: 12,
        }}
      >
        Running
      </Text>
      <View style={{ marginTop: 12 }}>
        {loading === true && (
          <ActivityIndicator size={"large"} color={"#2e89ff"} />
        )}
        {loading === false && (
          <>
            {data?.LEARNING_TERM?.length === 0 && (
              <View>
                <Text style={style.text1}>You're not learn any term</Text>
              </View>
            )}
            <View>
              {data?.LEARNING_TERM?.length > 0 && (
                <FlatList
                  data={data?.LEARNING_TERM}
                  numColumns={2}
                  ItemSeparatorComponent={() => <View style={{height: 10}} />}
                  renderItem={({ item, index, separators }) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => navigation.navigate("Term", {id_term: item.id_term, title: item.title})}
                      style={style.item}
                    >
                      <View style={{marginBottom: 24}}>
                        <View>
                          <Text style={style.text2}>{item.title}</Text>
                        </View>
                        <View>
                          <Text>
                            <Text
                              numberOfLines={1}
                              style={{ fontWeight: "600", overflow: "hidden" }}
                            >
                              Description:{" "}
                            </Text>
                            <Text>{item.description}</Text>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <Text style={{ fontWeight: "600", marginRight: 10 }}>
                          Author:{" "}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Image
                            style={{ width: 28, height: 28, borderRadius: 14 }}
                            source={{ uri: item.photoURL }}
                          />
                          <Text numberOfLines={1} style={{ fontWeight: "600", marginLeft: 12, overflow: "hidden", flex: 1}}>
                            {item.displayName}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
    position: "relative",
  },
  title: {
    fontSize: 24,
    marginTop: 12,
  },
  text1: {
    fontSize: 18,
    marginTop: 12,
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  item: {
    width: "50%",
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#d9d9d9",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
});

export default Activities;
