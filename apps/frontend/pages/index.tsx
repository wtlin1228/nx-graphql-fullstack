import * as React from 'react';
import usePosts from '../src/hooks/usePosts';
import useCreatePost from '../src/hooks/useCreatePost';
import { Post } from '@nx-graphql-fullstack/util-graphql-interface';

const Posts = () => {
  const postsQuery = usePosts();

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? 'updating...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map((post: Post) => {
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
  const createPostMutation = useCreatePost();

  return (
    <div>
      <h1>Create Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPostMutation.mutate({ message });
          setMessage('');
        }}
      >
        <label htmlFor="message">message: </label>
        <input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={createPostMutation.isLoading}
        />
      </form>
      <p style={{ color: 'gray', opacity: '0.7' }}>
        {createPostMutation.isLoading ? 'Saving...' : null}
        {createPostMutation.isError ? 'An error occurred' : null}
        {createPostMutation.isSuccess ? 'Post added!' : null}
      </p>
      {createPostMutation.isError ? (
        <pre>
          {JSON.stringify(
            createPostMutation.error.response.errors.map(
              (error) => error.message
            ),
            undefined,
            4
          )}
        </pre>
      ) : null}
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
