import axios from "axios";

export const postExpense = (expenseData) => {
  axios.post(
    "https://react-native-budget-bf0f2-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
};
