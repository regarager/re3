import { useState } from "react";
import { View } from "react-native";
import CameraPreview from "./CameraPreview";
import { Button, Text } from "react-native-paper";
import ImageUpload from "./ImageUpload";

export default function ImageView() {
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

  if (usingImage) {
    return (
      <View>
        <ImageUpload />
        <SwitchButton />
      </View>
    );
  } else {
    return (
      <View>
        <CameraPreview />
        <SwitchButton />
      </View>
    );
  }
}
