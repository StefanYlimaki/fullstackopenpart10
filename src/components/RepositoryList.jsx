import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import * as React from "react";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  orderByContainer: {
    height: 60,
    borderWidth: 2,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleRepositoryClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleRepositoryClick(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [orderByExplanation, setOrderByExplanation] = useState(
    "Latest repositories"
  );

  const { repositories } = useRepositories({
    orderBy: orderBy,
    orderDirection: orderDirection,
  });

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [visible, setVisible] = React.useState(false);

  const handleFilterChange = (newFilter) => {
    closeMenu();
    if (newFilter === "Latest repositories") {
      setOrderBy("CREATED_AT");
      setOrderDirection("DESC");
      setOrderByExplanation("Latest repositories");
    }
    if (newFilter === "Highest rated repositories") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection("DESC");
      setOrderByExplanation("Highest rated repositories");
    }
    if (newFilter === "Lowest rated repositories") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection("ASC");
      setOrderByExplanation("Lowest rated repositories");
    }
  };

  return (
    <View>
      <Picker
        selectedValue={orderByExplanation}
        onValueChange={(itemValue, itemIndex) => handleFilterChange(itemValue)}
        style={styles.orderByContainer}
      >
        <Picker.Item label="Latest repositories" value="Latest repositories" />
        <Picker.Item label="Highest rated repositories" value="Highest rated repositories" />
        <Picker.Item label="Lowest rated repositories" value="Lowest rated repositories" />
      </Picker>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;
