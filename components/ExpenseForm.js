import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../styles";
import Input from "./Input";

const ExpenseForm = ({ isEditing }) => {
  const handleAmount = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? "Edit Expense" : "Add Expense"}
      </Text>
      <View style={styles.dateAmountContainer}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleAmount,
          }}
          style={styles.dateAmountInputs}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: () => {},
          }}
          style={styles.dateAmountInputs}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.white,
    marginVertical: 24,
    textAlign: "center",
  },
  dateAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateAmountInputs: {
    flex: 1,
  },
});

export default ExpenseForm;
