import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "./../styles";

const ManageExpenseScreen = ({ route, navigation }) => {
  const expenseIdToEdit = route.params?.expenseId;
  const isEditing = !!expenseIdToEdit;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const handleDelete = () => {};

  const handleCancel = () => {};

  const handleConfirmation = () => {};

  return (
    <View style={styles.container}>
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
