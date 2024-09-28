import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function ImageUpload() {
  const [uri, setURI] = useState("");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const [image] = result.assets;

      setURI(image.uri);
    }
  };

  return uri.length > 0 ? (
    <Image style={styles.image} source={{ uri: uri }} />
  ) : (
    <Pressable style={styles.container} onPress={pickImageAsync}>
      <Icon source="image" size={64} color="#665a6f" />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
  },
  container: {
    display: "flex",
    width: 300,
    height: 200,
    borderColor: "#665a6f",
    borderWidth: 4,
    borderRadius: 16,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});
