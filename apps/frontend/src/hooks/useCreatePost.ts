import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from 'react-query';
import { useGraphQLClient } from '../contexts/useGraphQLClient';
import {
  CreatePostInput,
  Post,
} from '@nx-graphql-fullstack/util-graphql-interface';
import { GraphQLError } from 'graphql';

export const queryKey = 'posts';

export const createPostMutation = gql`
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

export default function useCreatePost() {
  const queryClient = useQueryClient();
  const graphQLClient = useGraphQLClient();

  return useMutation<
    Post,
    { response: { errors: GraphQLError[] } },
    CreatePostInput,
    () => void
  >(
    async (input: CreatePostInput) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await graphQLClient.request(createPostMutation, {
        input,
      });
      return response;
    },
    {
      onMutate: async (newPost: Post) => {
        await queryClient.cancelQueries(queryKey);

        const previousPosts: Post[] = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (oldPosts: Post[]) => [
          {
            ...newPost,
            id: Date.now().toString(),
          },
          ...oldPosts,
        ]);

        return () => queryClient.setQueryData(queryKey, previousPosts);
      },
      onError: (_err, _newPost, rollback) => {
        if (rollback) {
          rollback();
        }
      },
      onSettled: () => queryClient.invalidateQueries(queryKey),
    }
  );
}
