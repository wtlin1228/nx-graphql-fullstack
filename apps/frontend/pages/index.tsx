import React from 'react';
import { gql } from 'graphql-request';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useGraphQLClient } from '../contexts/graphqlClient';
import { CreatePostInput } from '@nx-graphql-fullstack/util-graphql-interface';

const allPostsQuery = gql`
  query AllPosts {
    posts {
      id
      message
      author {
        email
      }
    }
  }
`;

const createPostMutation = gql`
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

const Posts = () => {
  const graphQLClient = useGraphQLClient();
  const postsQuery = useQuery('posts', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await graphQLClient.request(allPostsQuery);
    return response.posts;
  });

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? 'updating...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map((post) => {
              return (
                <li key={post.id}>
                  <p>{post.message}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

const PostForm = () => {
  const [message, setMessage] = React.useState<string>('');

  const queryClient = useQueryClient();
  const graphQLClient = useGraphQLClient();

  const mutation = useMutation(
    async (input: CreatePostInput) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await graphQLClient.request(createPostMutation, {
        input,
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        setMessage('');
      },
    }
  );

  return (
    <div>
      <h1>Create Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({ message });
        }}
      >
        <label htmlFor="message">message: </label>
        <input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={mutation.isLoading}
        />
      </form>
      <p style={{ color: 'gray', opacity: '0.7' }}>
        {mutation.isLoading ? 'Saving...' : null}
        {mutation.isError ? 'An error occurred' : null}
        {mutation.isSuccess ? 'Post added!' : null}
      </p>
    </div>
  );
};

export function Index() {
  return (
    <div>
      <Posts />
      <PostForm />
    </div>
  );
}

export default Index;
