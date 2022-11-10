import FormikTextInput from "./FormikTextInput";
import { Formik, yupToFormErrors } from "formik";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import { useNavigate } from "react-router-native";
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview'
import Text from "./Text";
import { useMutation } from "@apollo/client";

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
  owner: '',
  repository: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner is required'),
  repository: yup.string().required('Repository is required'),
  rating: yup.number().required('Rating is required').max(100).min(0),
  text: yup.string()
});

export const ReviewForm = ({ onSubmit }) => {
  return(
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <View style={styles.fieldContainer}>
            <FormikTextInput 
              name="owner"
              placeholder="Reposity owner name" />
          </View>
          <View style={styles.fieldContainer}>
            <FormikTextInput
              name="repository"
              placeholder="Repository name"
            />
          </View>
          <View style={styles.fieldContainer}>
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
          </View>
          <View style={styles.fieldContainer}>
            <FormikTextInput
              name="text"
              placeholder="Write the review here"
            />
          </View>
          <Button testID="submit" onPress={handleSubmit}>
            Submit review
          </Button>
        </View>
      )}
    </Formik>
  )
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { owner, repository, rating, text } = values;

    const response = await createReview({ owner, repository, rating, text });
    navigate(`/${response.createReview.repositoryId}`)
  }

  return <ReviewForm onSubmit={onSubmit}/> 
}

export default CreateReview;
