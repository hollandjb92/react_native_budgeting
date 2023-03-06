import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "./../styles";

const Error = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: GlobalStyles.colors.white,
    textAlign: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Error;
