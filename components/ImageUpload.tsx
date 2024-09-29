import { Pressable, StyleSheet } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function ImageUpload({
  setImage,
}: {
  setImage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const [image] = result.assets;

      setImage(`data:image/jpeg;base64,${image.base64}`);
    }
  };

  return (
    <Pressable style={styles.container} onPress={pickImageAsync}>
      <Icon source="image" size={64} color="#665a6f" />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 300,
    height: 200,
    borderColor: MD3Colors.secondary50,
    borderWidth: 4,
    borderRadius: 16,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});
