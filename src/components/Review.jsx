import Text from "./Text";
import { View, StyleSheet } from "react-native";

const Review = ({ review }) => {

  const styles = StyleSheet.create({
    containerRow: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: 'white',
      padding: 15
    },
    containerColumn: {
      flexDirection: 'column',
      backgroundColor: 'white',
      paddingLeft: 15,
      flexGrow: 1,
      flexShrink: 1,
    },
    ratingCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      color: 'blue',
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'blue'
    },
    retingContainter: {
      alignSelf: 'center',
      color: 'blue',
      fontSize: 16,
      paddingTop: 6,
      fontWeight: "500"
    },
    textContainer: {
      paddingTop: 10,
      flexGrow: 1
    }
  });

  const timeStamp = Date.parse(review.createdAt)
  const date = new Date(timeStamp)

  return(
    <View >
      <View style={styles.containerRow}>
        <View style={styles.ratingCircle}>
          <Text style={styles.retingContainter} >
            {review.rating}
          </Text>
        </View>
        <View style={styles.containerColumn}>
          <Text fontWeight={"bold"}>
            {review.user.username}
          </Text>
          <Text>
            {date.toDateString()}
          </Text>
          <Text style={styles.textContainer}>
            {review.text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Review;
