import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenseScreen from "./screens/ManageExpense";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import { GlobalStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const ExpenseOverview = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: GlobalStyles.colors.text,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
      }}
    >
      <Tabs.Screen
        name="Recent Expenses"
        component={RecentExpensesScreen}
        options={{
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="hourglass" />
          ),
        }}
      />
      <Tabs.Screen
        name="All Expenses"
        component={AllExpensesScreen}
        options={{
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="calendar" />
          ),
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
        }}
      />
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Overview"
            component={ExpenseOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Manage" component={ManageExpenseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
