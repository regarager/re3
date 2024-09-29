import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Camera from "./Camera";
import { Button, Text } from "react-native-paper";
import ImageUpload from "./ImageUpload";

export default function ImageView({
  image,
  setImage,
}: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [usingImage, setUsingImage] = useState(true); // using image upload (true) or camera false

  const SwitchButton = () => {
    if (usingImage) {
      return (
        <Button icon="camera" onPress={() => setUsingImage(false)}>
          <Text>Use Camera</Text>
        </Button>
      );
    } else {
      return (
        <Button icon="upload" onPress={() => setUsingImage(true)}>
          <Text>Upload Image</Text>
        </Button>
      );
    }
  };

  if (image.length > 0) {
    return <Image style={styles.image} source={{ uri: image }} />;
  }

  if (usingImage) {
    return (
      <View>
        <ImageUpload setImage={setImage} />
        <SwitchButton />
      </View>
    );
  } else {
    return (
      <View>
        <Camera setImage={setImage} />
        <SwitchButton />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
  },
});
