import { useContext } from "react";
import Expenses from "../components/Expenses";
import { ExpensesContext } from "./../store/expensesContext";

const AllExpensesScreen = () => {
  const expensesContext = useContext(ExpensesContext);

  return <Expenses expenses={expensesContext.expenses} timePeriod="Total" />;
};

export default AllExpensesScreen;
