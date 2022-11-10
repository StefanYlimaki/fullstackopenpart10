import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES, SINGLE_REPOSITORY } from '../graphql/queries';

const useRepositories = (id) => {
  
  if(id){
    const variables= {
      repositoryId: id
    }
    const {data, loading, ...result } = useQuery(SINGLE_REPOSITORY, {
      variables,
      fetchPolicy: 'cache-and-network',
    });

    return { repository: data ? data.repository : undefined, ...result }

  }

  const { data, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;
