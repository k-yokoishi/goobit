import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container } from "native-base";
import Footer from "./component/Footer";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app</Text>
        </View>
        <Footer />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
