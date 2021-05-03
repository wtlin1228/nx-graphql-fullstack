import * as React from 'react';

// hooks
import useCreatePost from '../hooks/useCreatePost';

const CreatePostForm = () => {
  const [message, setMessage] = React.useState<string>('');
  const [createPost, { loading, error }] = useCreatePost();

  return (
    <div>
      <h1>Create Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost({
            variables: { input: { message } },
            optimisticResponse: {
              createPost: {
                id: 'temp-id',
                __typename: 'Post',
                message,
                author: {
                  email: 'temp@gmail.com',
                },
              },
            },
          });
          setMessage('');
        }}
      >
        <label htmlFor="message">message: </label>
        <input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
      </form>
      <p style={{ color: 'gray', opacity: '0.7' }}>
        {loading ? 'Saving...' : null}
        {error ? 'An error occurred' : null}
      </p>
      {error ? <pre>{JSON.stringify(error.message, undefined, 4)}</pre> : null}
    </div>
  );
};

export default CreatePostForm;
