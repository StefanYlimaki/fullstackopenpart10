
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet } from "react-native-web";



const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  orderByContainer: {
    height: 60,
    borderWidth: 2,
  },
});

const OrderBy = ({ handleChange }) => {
  const [value, setValue] = useState('')

  const handle = (itemValue) => {
    setValue(itemValue)
    handleChange(itemValue)
  }

    return (
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => handle(itemValue)}
          style={styles.orderByContainer}
        >
          <Picker.Item label="Latest repositories" value="Latest repositories" />
          <Picker.Item
            label="Highest rated repositories"
            value="Highest rated repositories"
          />
          <Picker.Item
            label="Lowest rated repositories"
            value="Lowest rated repositories"
          />
        </Picker>
      );
}

export default OrderBy