import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./page";
import ImageView from "../components/ImageView";

export default function Recycle() {
  return (
    <View style={styles.container}>
      <Text>Recycle</Text>
      <ImageView />
    </View>
  );
}
