import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);

  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const result = await yelp.get(`/${id}`);
    setResult(result.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  // Ensure screenWidth is inside the component
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Image
            style={[styles.image, { width: screenWidth * 0.9 }]}
            source={{ uri: item }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
  },
  list: {
    alignItems: "center",
  },
  image: {
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: "cover",
  },
});

export default ResultsShowScreen;
