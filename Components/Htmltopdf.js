import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";


export default function htmltopdf() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const html = `
    <html>
      <body>
        <h1>Name: ${name}</h1>
        <h1>Age: ${age}</h1>
        <p style="color: red;">Hello. Bonjour. Hola.</p>
      </body>
    </html>
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };
  return (
    <View style={styles.container}>
      <Text>Enter name:</Text>
      <TextInput
        placeholder="e.g. John Doe"
        style={styles.input}
        onChangeText={(value) => setName(value)}
      />

      <Text>Enter age:</Text>
      <TextInput
        placeholder="e.g. 99"
        style={styles.input}
        onChangeText={(value) => setAge(value)}
      />

      <Button title="Generate PDF" onPress={generatePdf} />

      <Text style={styles.result}>
        name: {name}, age: {age}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#777",
      padding: 8,
      margin: 10,
      width: 200,
    },
  });