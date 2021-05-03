import { gql, useMutation } from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
      __typename
      message
      author {
        email
      }
    }
  }
`;

export default function useCreatePost() {
  return useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: createPost,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  message
                  author {
                    email
                  }
                }
              `,
            });

            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
  });
}
