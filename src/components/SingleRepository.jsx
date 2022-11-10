import { FlatList, View } from "react-native";
import { useParams } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import Review from "./Review";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepositories(id);

  if (repository) {
    return (
      <View>
        <RepositoryItem viewingSingle={true} repository={repository}/>
        <FlatList 
            data={repository.reviews.edges}
            renderItem={({ item }) => (
                <Review key={item.id} review={item.node} />
            )}
        />
      </View>
    );
  }
  return <Text>Loading...</Text>;
};

export default SingleRepository;