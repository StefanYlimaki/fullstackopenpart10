import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createReview = async ({ username, password }) => {
    const user = {
        username,
        password
    }

    const payload = await mutate({ variables:{ user } });
    const { data } = payload
    return data;
  };

  return [createReview, result];
};

export default useCreateUser;
