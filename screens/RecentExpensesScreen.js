import Expenses from "../components/Expenses";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "./../store/expensesContext";
import { getDateMinusDays } from "../utils/date";
import { getExpenses } from "../utils/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

const RecentExpensesScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not load expenses");
      }
      setIsLoading(false);
    };
    fetchExpenses();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysPrior = getDateMinusDays(today, 7);

    return expense.date >= date7DaysPrior && expense.date <= today;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error && !isLoading) {
    return <Error message={error} />;
  }

  return (
    <Expenses
      expenses={recentExpenses}
      timePeriod="Last 7 Days"
      defaultText="No expenses in the last 7 days"
    />
  );
};

export default RecentExpensesScreen;
