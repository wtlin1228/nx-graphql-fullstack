import { gql, useMutation } from '@apollo/client';

const UPDATE_POST = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
      __typename
      message
      author {
        email
      }
    }
  }
`;

export default function useUpdatePost() {
  return useMutation(UPDATE_POST, {
    onError(error) {
      console.error(error);
    },
    update(cache, { data: { updatePost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            cache.writeFragment({
              id: updatePost.id,
              data: updatePost,
              fragment: gql`
                fragment UpdatePost on Post {
                  message
                }
              `,
            });

            return existingPosts;
          },
        },
      });
    },
  });
}
