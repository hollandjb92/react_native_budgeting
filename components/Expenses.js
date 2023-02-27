import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Amazon.com",
    amount: 24.99,
    date: new Date("2023-02-26"),
  },
  {
    id: "e2",
    description: "Alamo Drafthouse",
    amount: 39.87,
    date: new Date("2023-02-25"),
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

const Expenses = ({ expenses, timePeriod }) => {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} timePeriod={timePeriod} />
      <ExpensesList />
    </View>
  );
};

export default Expenses;
