import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository'
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="sign-in" element={<SignIn />} exact />
        <Route path="/:id" element={<SingleRepository /> } exact />
        <Route path="/createReview" element={ <CreateReview  /> } exact />
        <Route path="sign-up" element={<SignUp /> } exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
