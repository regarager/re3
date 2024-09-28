import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

export default function CameraPreview() {
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
    const picture = await cameraRef.current?.takePictureAsync();

    if (picture) {
      console.log(picture.base64);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="picture"
      >
        <View style={styles.buttonContainer}>
          <Button onPress={toggleCameraFacing} icon="camera-flip">
            <></>
          </Button>
        </View>
        <Button onPress={takePicture} icon="camera">
          <Text>Take a Picture</Text>
        </Button>
      </CameraView>
    </View>
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
    color: "white",
  },
});
