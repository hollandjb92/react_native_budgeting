import axios from "axios";

const BASE_URL =
  "https://react-native-budget-bf0f2-default-rtdb.firebaseio.com";

export const postExpense = async (expenseData) => {
  const response = await axios.post(BASE_URL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(BASE_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expense = {
      id: key,
      amount: response.data[key].amount,
      description: response.data[key].description,
      date: new Date(response.data[key].date),
    };

    expenses.push(expense);
  }

  return expenses;
};

export const updateExpenseReq = (id, expenseData) => {
  return axios.put(BASE_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpenseReq = (id) => {
  return axios.delete(BASE_URL + `/expenses/${id}.json`);
};
