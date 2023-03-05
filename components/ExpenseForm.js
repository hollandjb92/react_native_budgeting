import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../styles";
import Button from "./Button";
import Input from "./Input";
import { getFormattedDate } from "./../utils/date";

const ExpenseForm = ({
  isEditing,
  onCancel,
  onSubmit,
  defaultExpenseValues,
}) => {
  const [input, setInput] = useState({
    amount: {
      value: defaultExpenseValues ? defaultExpenseValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultExpenseValues
        ? getFormattedDate(defaultExpenseValues.date)
        : "",
      isValid: true,
    },
    description: {
      value: defaultExpenseValues ? defaultExpenseValues.description : "",
      isValid: true,
    },
  });

  const handleInput = (key, value) => {
    setInput((prevState) => {
      return {
        ...prevState,
        [key]: { value, isValid: true },
      };
    });
  };

  const handleSubmit = () => {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInput((prevState) => {
        return {
          amount: { value: prevState.amount.value, isValid: amountIsValid },
          date: { value: prevState.date.value, isValid: dateIsValid },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const isInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

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
            onChangeText: handleInput.bind(this, "amount"),
            value: input.amount.value,
          }}
          style={styles.dateAmountInputs}
          invalid={!input.amount.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleInput.bind(this, "date"),
            value: input.date.value,
          }}
          style={styles.dateAmountInputs}
          invalid={!input.date.isValid}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: handleInput.bind(this, "description"),
          value: input.description.value,
        }}
        invalid={!input.description.isValid}
      />
      {isInvalid && (
        <Text style={styles.errorText}>
          Invalid input - please double check your expense
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

export default ExpenseForm;
