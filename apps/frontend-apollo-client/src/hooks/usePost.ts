import { useQuery, gql } from '@apollo/client';

export const POST = gql`
  query Post($input: ID!) {
    post(id: $input) {
      id
      __typename
      message
      author {
        email
      }
    }
  }
`;

export default function usePost(postId: string) {
  return useQuery(POST, {
    variables: { input: postId },
  });
}
