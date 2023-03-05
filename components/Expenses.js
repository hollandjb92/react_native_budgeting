import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "./../styles";

const Expenses = ({ expenses, timePeriod, defaultText }) => {
  let content = <Text style={styles.defaultText}>{defaultText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} timePeriod={timePeriod} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  defaultText: {
    color: GlobalStyles.colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
export default Expenses;
