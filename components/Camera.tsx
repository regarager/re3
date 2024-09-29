import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

export default function CameraPreview({
  setImage,
}: {
  setImage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View>
        <Text>Awaiting permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>
          <Text>Grant Permission to Use Camera</Text>
        </Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    const picture = await cameraRef.current?.takePictureAsync({
      base64: true,
      imageType: "jpg",
    });

    if (picture) {
      // TODO: fix black image on android
      setImage(picture.base64 ?? "");
    }
  }

  return (
    <CameraView
      ref={cameraRef}
      style={styles.camera}
      facing={facing}
      mode="picture"
    >
      <View style={styles.buttonContainer}>
        <IconButton onPress={toggleCameraFacing} icon="camera-flip" size={32} />
      </View>
      <IconButton
        onPress={takePicture}
        icon="camera"
        size={48}
        style={{ alignSelf: "center" }}
      />
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    height: 512,
    width: 512,
  },
  image: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    paddingTop: 10,
  },
  style: {
    flex: 1,
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
