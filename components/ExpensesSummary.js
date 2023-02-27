import { View, Text } from "react-native";

const ExpensesSummary = ({ timePeriod, expenses }) => {
  const expenseSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{timePeriod}</Text>
      <Text>${expenseSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
