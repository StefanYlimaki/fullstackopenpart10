import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ owner, repository, rating, text }) => {
    const review = {
        ownerName: owner,
        rating: Number(rating),
        repositoryName: repository,
        text: text
    }

    const payload = await mutate({ variables:{ review } });
    const { data } = payload
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
