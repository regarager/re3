import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import ImageView from "../components/ImageView";
import { useEffect, useState } from "react";
import React from "react";

interface APIResponse {
  loaded: boolean;
  content: string;
}

export default function Image() {
  const [image, setImage] = useState(""); // base 64
  const [uploaded, setUploaded] = useState(false);
  const [filename, setFilename] = useState("");

  const [itemType, setItemType] = useState<APIResponse>({
    loaded: false,
    content: "",
  });
  const [recycle, setRecycle] = useState<APIResponse>({
    loaded: false,
    content: "",
  });
  const [reduce, setReduce] = useState<APIResponse>({
    loaded: false,
    content: "",
  });
  const [reuse, setReuse] = useState<APIResponse>({
    loaded: false,
    content: "",
  });

  useEffect(() => {
    async function uploadImage() {
      if (image.length === 0) return;

      try {
        const response = await fetch(
          "http://10.0.2.2:5000/upload_image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image }),
          },
        );

        if (response.ok) {
          const res = await response.text();

          if (res.match(/[0-9a-f]+/)) {
            await fetch("http://10.0.2.2:5000/gemini", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ file: res }),
            });

            setUploaded(true);

            setFilename(res);
          }
        } else {
          console.error(
            "Error uploading image:",
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    uploadImage();
  }, [image]);

  useEffect(() => {
    if (filename.length === 0) return;

    const getResponses = async () => {
      await fetch("http://10.0.2.2:5000/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: filename }),
      })
        .then((res) => res.text())
        .then((res) => {
          setItemType({ loaded: true, content: res });
          return res;
        })
        .then((item) => {
          fetch("http://10.0.2.2:5000/reduce", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file: filename,
              item: item,
            }),
          })
            .then((res) => res.text())
            .then((res) =>
              setReduce({
                loaded: true,
                content: res
                  .replaceAll("**", "")
                  .replaceAll("*", "•"),
              }),
            );

          fetch("http://10.0.2.2:5000/reuse", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file: filename,
              item: item,
            }),
          })
            .then((res) => res.text())
            .then((res) =>
              setReuse({
                loaded: true,
                content: res
                  .replaceAll("**", "")
                  .replaceAll("*", "•"),
              }),
            );

          fetch("http://10.0.2.2:5000/recycle", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file: filename,
              item: item,
            }),
          })
            .then((res) => res.text())
            .then((res) =>
              setRecycle({
                loaded: true,
                content: res
                  .replaceAll("**", "")
                  .replaceAll("*", "•"),
              }),
            );
        });
    };

    getResponses();
  }, [filename]);

  const clear = () => {
    setImage("");
    setUploaded(false);
    setFilename("");
    setItemType({
      loaded: false,
      content: "",
    });
    setRecycle({
      loaded: false,
      content: "",
    });
    setReduce({
      loaded: false,
      content: "",
    });
    setReuse({
      loaded: false,
      content: "",
    });
  };

  return (
    <View style={styles.container}>
      <ImageView image={image} setImage={setImage} />
      <View>
        <Button icon="trash-can" onPress={clear}>
          Clear
        </Button>
        {image.length === 0 ? (
          <></>
        ) : uploaded ? (
          <ScrollView contentContainerStyle={styles.responses}>
            <Text style={styles.title}>Type of Trash</Text>
            <Text>{itemType.loaded ? itemType.content : "..."}</Text>
            <Text style={styles.title}>Reduce</Text>
            <Text>{reduce.loaded ? reduce.content : "..."}</Text>
            <Text style={styles.title}>Reuse</Text>
            <Text>{reuse.loaded ? reuse.content : "..."}</Text>
            <Text style={styles.title}>Recycle</Text>
            <Text>{recycle.loaded ? recycle.content : "..."}</Text>
          </ScrollView>
        ) : (
          <Text>Uploading image...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  responses: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
});
