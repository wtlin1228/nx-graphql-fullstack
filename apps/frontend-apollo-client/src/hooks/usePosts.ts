import { useQuery, gql } from '@apollo/client';

export const ALL_POSTS = gql`
  query AllPosts {
    posts {
      id
      __typename
      message
      author {
        email
      }
    }
  }
`;

export default function usePosts() {
  return useQuery(ALL_POSTS, {
    onCompleted: (data) => {
      // console.log(data);
    },
    onError: (err) => {
      // console.error(err);
    },
  });
}
