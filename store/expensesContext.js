import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Amazon.com",
    amount: 24.99,
    date: new Date("2023-02-28"),
  },
  {
    id: "e2",
    description: "Alamo Drafthouse",
    amount: 39.87,
    date: new Date("2023-02-27"),
  },
  {
    id: "e3",
    description: "Turntable Lab",
    amount: 35.99,
    date: new Date("2023-02-15"),
  },
  {
    id: "e4",
    description: "Panera Bread",
    amount: 16.35,
    date: new Date("2023-02-26"),
  },
  {
    id: "e5",
    description: "Barnes and Noble",
    amount: 10.99,
    date: new Date("2023-01-17"),
  },
];

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date.toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
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
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
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
