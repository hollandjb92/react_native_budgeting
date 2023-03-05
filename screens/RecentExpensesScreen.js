import Expenses from "../components/Expenses";
import { useContext } from "react";
import { ExpensesContext } from "./../store/expensesContext";
import { getDateMinusDays } from "../utils/date";

const RecentExpensesScreen = () => {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysPrior = getDateMinusDays(today, 7);

    return expense.date >= date7DaysPrior && expense.date <= today;
  });

  return (
    <Expenses
      expenses={recentExpenses}
      timePeriod="Last 7 Days"
      defaultText="No expenses in the last 7 days"
    />
  );
};

export default RecentExpensesScreen;
