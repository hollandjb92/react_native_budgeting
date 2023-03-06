import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "./../styles";

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.white} />
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
});

export default LoadingSpinner;
