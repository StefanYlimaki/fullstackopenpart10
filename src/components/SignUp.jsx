
import { StyleSheet, View } from 'react-native';
import { Formik, yupToFormErrors } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import FormikTextInput from './FormikTextInput';
import useCreateUser from '../hooks/useCreateUser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Re-enter password is required'),
});

export const SignUpForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => 
        <View style={styles.container}>
          <View style={styles.fieldContainer}>
            <FormikTextInput name="username" placeholder="Username" />
          </View>
          <View style={styles.fieldContainer}>
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
            />
          </View><View style={styles.fieldContainer}>
            <FormikTextInput
              name="passwordConfirm"
              placeholder="Re-enter password"
              secureTextEntry
            />
          </View>
          <Button testID="submit" onPress={handleSubmit}>Sign up</Button>
        </View>
      }
    </Formik>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await createUser({ username, password });
  };

  return (
    <SignUpForm onSubmit={onSubmit} />
  );
};

export default SignUp
