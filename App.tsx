import { StyleSheet } from "react-native";
import {
  BottomNavigation,
  MD3DarkTheme,
  PaperProvider,
} from "react-native-paper";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Image from "./pages/Image";
import Recycle from "./pages/Recycle";

export default function App() {
  const [index, setIndex] = useState(0);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: Dashboard,
    classify: Image,
    recycle: Recycle,
  });

  const [routes] = useState([
    { key: "dashboard", title: "Home", focusedIcon: "home" },
    { key: "classify", title: "Classify", focusedIcon: "upload" },
    { key: "recycle", title: "Recycling", focusedIcon: "recycle" },
  ]);

  const theme = MD3DarkTheme;

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
