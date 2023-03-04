import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "./../styles";
import { getFormattedDate } from "./../utils/date";

const ExpenseItem = ({ description, amount, date }) => {
  const handlePress = () => {};
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.outerView}>
        <View>
          <Text style={[styles.text, styles.descriptionText]}>
            {description}
          </Text>
          <Text style={styles.text}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerView: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
  },
  text: {
    color: GlobalStyles.colors.primary50,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amountText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ExpenseItem;
