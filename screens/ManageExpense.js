import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "./../styles";
import { ExpensesContext } from "./../store/expensesContext";
import ExpenseForm from "../components/ExpenseForm";
import { postExpense } from "../utils/axios";

const ManageExpenseScreen = ({ route, navigation }) => {
  const expenseIdToEdit = route.params?.expenseId;
  const isEditing = !!expenseIdToEdit;
  const { deleteExpense, addExpense, updateExpense, expenses } =
    useContext(ExpensesContext);

  const expenseToEdit = expenses.find(
    (expense) => expense.id === expenseIdToEdit
  );

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

  const handleConfirmation = (expenseData) => {
    if (isEditing) {
      updateExpense(expenseIdToEdit, expenseData);
    } else {
      postExpense(expenseData);
      addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={handleCancel}
        onSubmit={handleConfirmation}
        defaultExpenseValues={expenseToEdit}
      />

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
});

export default ManageExpenseScreen;
