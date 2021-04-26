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
    { previousPosts: Post[] }
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
        queryClient.setQueryData(queryKey, (old: Post[]) => [newPost, ...old]);
        return { previousPosts };
      },
      onError: (_err, _newPost, context) => {
        queryClient.setQueryData(queryKey, context.previousPosts);
      },
      onSettled: () => queryClient.invalidateQueries(queryKey),
    }
  );
}
