import { View } from "react-native";
import { Page } from "../types";
import { Text } from "react-native-paper";
import CameraPreview from "../components/CameraPreview";
import { styles } from "./page";

export default function Recycle() {
  return (
    <View style={styles.container}>
      <Text>Recycle</Text>
      <CameraPreview />
    </View>
  );
}
