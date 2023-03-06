import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const expenseToUpdateIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const expenseToUpdate = state[expenseToUpdateIndex];
      const updatedExpense = { ...expenseToUpdate, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseToUpdateIndex] = updatedExpense;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "SET":
      const reversed = action.payload.reverse();
      return reversed;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
