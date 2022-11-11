import { View, Image, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';
import Button from './Button';
import formatInThousands from '../utils/formatInThousands';

import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text testID={label} style={styles.countItemCount} fontWeight="bold">
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository, viewingSingle }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    id
  } = repository;

  return (
    <View>
      <View testID='repositoryItem' style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
          </View>
          <View style={styles.contentContainer}>
            <Text
              testID="fullName"
              style={styles.nameText}
              fontWeight="bold"
              fontSize="subheading"
              numberOfLines={1}
            >
              {fullName}
            </Text>
            <Text testID="description" style={styles.descriptionText} color="textSecondary">
              {description}
            </Text>
            {language ? (
              <View testID="language" style={styles.languageContainer}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CountItem count={stargazersCount} label="Stars" />
          <CountItem count={forksCount} label="Forks" />
          <CountItem count={reviewCount} label="Reviews" />
          <CountItem count={ratingAverage} label="Rating" />
        </View>
        { viewingSingle 
          ? <View>
              <View style={{ paddingTop: 15 }}>
                <Button onPress={() => Linking.openURL(repository.url)} >Open in Github</Button>
              </View>
            </View>
          : <></> }
      </View>
      { viewingSingle ? <View style={{ height: 10, backgroundColor: "#e1e4e8"}}></View> : <></>}
    </View>
  );
};

export default RepositoryItem;
