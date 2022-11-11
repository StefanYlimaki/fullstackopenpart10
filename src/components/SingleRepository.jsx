import { FlatList, View } from "react-native";
import { useParams } from "react-router-native";
import { StyleSheet } from "react-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import Review from "./Review";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  orderByContainer: {
    height: 60,
    borderWidth: 2,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore }  = useRepository({
    repositoryId: id,
    first: 3
  });

  const onEndReach = () => {
    fetchMore();
  }

  if (repository) {
    return (
      <View>
        <FlatList 
            ListHeaderComponent={<RepositoryItem viewingSingle={true} repository={repository}/>}
            data={repository.reviews.edges}
            renderItem={({ item }) => (
                <Review key={item.id} review={item.node} />
            )}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    );
  }
  return <Text>Loading...</Text>;
};

export default SingleRepository;
