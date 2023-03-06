import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "./../styles";
import { ExpensesContext } from "./../store/expensesContext";
import ExpenseForm from "../components/ExpenseForm";
import {
  deleteExpenseReq,
  postExpense,
  updateExpenseReq,
} from "../utils/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

const ManageExpenseScreen = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
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

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      deleteExpense(expenseIdToEdit);
      await deleteExpenseReq(expenseIdToEdit);
      navigation.goBack();
    } catch (error) {
      setError("Failed to delete expense - please try again");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirmation = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateExpense(expenseIdToEdit, expenseData);
        await updateExpenseReq(expenseIdToEdit, expenseData);
      } else {
        const id = await postExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save expense - please try again");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  if (error && !isSubmitting) {
    return <Error message={error} />;
  }

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
