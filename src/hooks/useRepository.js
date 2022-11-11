import { useQuery } from '@apollo/client';

import { SINGLE_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
    const variables = {
        repositoryId: id
    }
    const {data, loading, ...result } = useQuery(SINGLE_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables
    });

    return { repository: data ? data.repository : undefined, ...result }
  }
export default useRepository;