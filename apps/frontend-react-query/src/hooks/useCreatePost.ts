import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

// types
import type { ClientError } from 'graphql-request';
import type {
  CreatePostInput,
  Post,
} from '@nx-graphql-fullstack/util-graphql-interface';

export const createPostQueryKey = 'posts';

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
      message
      author {
        email
      }
    }
  }
`;

export const mutateCreatePost = async (
  input: CreatePostInput
): Promise<Post> => {
  const response = await graphQLClient.request(CREATE_POST, {
    input,
  });

  return response.createPost;
};

export default function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<
    Post,
    ClientError,
    CreatePostInput,
    { rollback: () => void }
  >(mutateCreatePost, {
    onMutate: async (newPost: CreatePostInput) => {
      await queryClient.cancelQueries(createPostQueryKey);

      const previousPosts: Post[] =
        queryClient.getQueryData(createPostQueryKey) || [];

      queryClient.setQueryData(createPostQueryKey, (oldPosts: Post[] = []) => [
        {
          ...newPost,
          id: Date.now().toString(),
        },
        ...oldPosts,
      ]);

      return {
        rollback: () =>
          queryClient.setQueryData(createPostQueryKey, previousPosts),
      };
    },
    onError: (_err, _newPost, { rollback }) => {
      if (rollback) {
        rollback();
      }
    },
    onSettled: () => queryClient.invalidateQueries(createPostQueryKey),
  });
}
