import * as React from 'react';

// hooks
import useCreatePost from '../hooks/useCreatePost';

const CreatePostForm = () => {
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

export default CreatePostForm;
