import { StyleSheet, Text, View } from "react-native";
import { Page } from "../types";
import { Button } from "react-native-paper";

export default function Navbar({ nav }: Page) {
  return (
    <View>
      <Button icon="home">Home</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
