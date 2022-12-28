import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../../App";
import LEARNING_TERM from "../../graphql/query/learing_term";
import Latest from "./Latest";
// import SplashScreen from '../SplashScreen/SplashScreen'

const Home = () => {
  const navigation = useNavigation();
  const { uid } = useContext(AppContext);
  const { data, loading, error } = useQuery(LEARNING_TERM, {
    variables: {
      id_user: uid,
    },
    fetchPolicy: "network-only",
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 12,
          padding: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: 80,
              padding: 10,
              backgroundColor: "#d9d9d9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image
              style={{ width: 28, height: 28, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/a-/AOh14GiyzFzWZPVVn5cJhfsK3cFzGlBEEwUQBebUwFig=s200-c",
              }}
            />
            <Text style={{ fontWeight: "600", marginLeft: 12 }}>
              Datist Pham
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
            <Text
              onPress={() => navigation.navigate("Activities")}
              style={{ fontWeight: "600", fontSize: 14, marginRight: 12 }}
            >
              Activities
            </Text>
            <Text
              onPress={() => navigation.navigate("Profile")}
              style={{ fontWeight: "600", fontSize: 14 }}
            >
              Profile
            </Text>
          </View>
        </View>
      </View>
      <View style={{ widht: "100%", padding: 10 }}>
        <Text style={styles.title}>Recent</Text>
        <View style={{ marginTop: 12 }}>
          {error && <Text>{error.message}</Text>}
          {loading === true && (
            <ActivityIndicator size={"large"} color={"#2e89ff"} />
          )}
          {loading === false && (
            <>
              {data?.LEARNING_TERM?.length === 0 && (
                <View>
                  <Text style={styles.text1}>You're not learn any term</Text>
                </View>
              )}
              <View>
                {data?.LEARNING_TERM?.length > 0 && (
                  <FlatList
                    ItemSeparatorComponent={() => <View style={{height: 10}} />}
                    data={data?.LEARNING_TERM}
                    numColumns={2}
                    renderItem={({ item, index, separators }) => <Latest key={index} {...item} />}
                  />
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
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
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#d9d9d9",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
});

export default Home;
