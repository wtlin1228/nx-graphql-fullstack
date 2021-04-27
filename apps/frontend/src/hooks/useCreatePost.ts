import { gql } from 'graphql-request';
import { GraphQLError } from 'graphql';
import { useMutation, useQueryClient } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

// types
import {
  CreatePostInput,
  Post,
} from '@nx-graphql-fullstack/util-graphql-interface';

export const queryKey = 'posts';

export const gqlCreatePostMutation = gql`
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

export const mutateCreatePost = async (input: CreatePostInput) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await graphQLClient.request(gqlCreatePostMutation, {
    input,
  });
  return response;
};

export default function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<
    Post,
    { response: { errors: GraphQLError[] } },
    CreatePostInput,
    () => void
  >((input: CreatePostInput) => mutateCreatePost(input), {
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
  });
}
