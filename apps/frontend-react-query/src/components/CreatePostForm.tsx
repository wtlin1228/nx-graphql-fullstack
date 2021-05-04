import * as React from 'react';

// hooks
import useCreatePost from '../hooks/useCreatePost';

const CreatePostForm = () => {
  const [message, setMessage] = React.useState<string>('');
  const { mutate, error, isLoading, isError, isSuccess } = useCreatePost();

  return (
    <div>
      <h1>Create Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ message });
          setMessage('');
        }}
      >
        <label htmlFor="message">message: </label>
        <input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
      </form>
      <p style={{ color: 'gray', opacity: '0.7' }}>
        {isLoading ? 'Saving...' : null}
        {isError ? 'An error occurred' : null}
        {isSuccess ? 'Post added!' : null}
      </p>
      {isError ? (
        <pre>
          {JSON.stringify(
            error.response.errors.map((error) => error.message),
            undefined,
            4
          )}
        </pre>
      ) : null}
    </div>
  );
};

export default CreatePostForm;
