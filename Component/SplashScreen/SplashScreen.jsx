import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

export default class SplashScreen extends React.Component {
    render() {
      
      return (
        <View style={styles.viewStyles}>
            <Text style={styles.textStyles}>
                Loading
            </Text>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    viewStyles: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'orange',
      position: "relative",
      top: -90
      
    },
    textStyles: {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold'
    }
  })