import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  BottomNavigation,
  MD3DarkTheme,
  PaperProvider,
} from "react-native-paper";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Image from "./pages/Image";
import Reduce from "./pages/Reduce";
import Reuse from "./pages/Reuse";

export default function App() {
  const [index, setIndex] = useState(0);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: Dashboard,
    recycle: Image,
    reduce: Reduce,
    reuse: Reuse,
  });

  const [routes] = useState([
    { key: "dashboard", title: "Home", focusedIcon: "home" },
    { key: "recycle", title: "Recycle", focusedIcon: "recycle" },
    { key: "reduce", title: "Reduce", focusedIcon: "arrow-collapse-all" },
    { key: "reuse", title: "Reuse", focusedIcon: "sync-circle" },
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
