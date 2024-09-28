import { Text, View } from "react-native";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";

import { styles } from "./page";

export default function Dashboard() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  function onAuthStateChanged(user: User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return;
  <View style={styles.container}>
    <Text>Loading account...</Text>
  </View>;

  return (
    <View style={styles.container}>
      <Text>asdf</Text>
    </View>
  );
}
