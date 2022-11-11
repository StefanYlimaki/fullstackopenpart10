import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Searchbar } from "react-native-paper";

import * as React from "react";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import OrderBy from "./OrderBy";
import Search from "./Search";

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

const RepositoryList = () => {
  const [search, setSearch] = useState("");
  const [debounceValue] = useDebounce(search, 500);
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy: orderBy,
    orderDirection: orderDirection,
    searchKeyword: debounceValue,
  });

  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleRepositoryClick = (id) => {
    navigate(`/${id}`);
  };

  const handleOrderByChange = (newOrderBy) => {
    if (newOrderBy === "Latest repositories") {
      setOrderBy("CREATED_AT");
      setOrderDirection("DESC");
    }
    if (newOrderBy === "Highest rated repositories") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection("DESC");
    }
    if (newOrderBy === "Lowest rated repositories") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection("ASC");
    }
  };

  const onEndReach = () => {
    fetchMore();
  }

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Search search={ search } setSearch={ setSearch } />
          <OrderBy handleChange={ handleOrderByChange }/>
        </View>
      }
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleRepositoryClick(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;
