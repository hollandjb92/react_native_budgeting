import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "./../styles";
import { ExpensesContext } from "./../store/expensesContext";
import ExpenseForm from "../components/ExpenseForm";

const ManageExpenseScreen = ({ route, navigation }) => {
  const expenseIdToEdit = route.params?.expenseId;
  const isEditing = !!expenseIdToEdit;
  const { deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Manage Expense",
    });
  }, [navigation, isEditing]);

  const handleDelete = () => {
    deleteExpense(expenseIdToEdit);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirmation = () => {
    if (isEditing) {
      updateExpense(expenseIdToEdit, {
        description: "Test!!",
        amount: 19.99,
        date: new Date("2023-02-03"),
      });
    } else {
      addExpense({
        description: "Test",
        amount: 9.99,
        date: new Date("2023-03-04"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm isEditing={isEditing} />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirmation}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      <View style={styles.deleteIconContainer}>
        {isEditing && (
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDelete}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteIconContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpenseScreen;
