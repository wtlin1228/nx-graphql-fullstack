import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { server } from '../../tests/setupTests';
import createReactQueryWrapper from '../../tests/createReactQueryWrapper';
import useCreatePost from '../useCreatePost';

// mocks
import { generateRandomPost, generateRandomUser } from '../../__mocks__';

test('should get post', async () => {
  const MOCK_MESSAGE = 'fake message';
  const MOCK_POST_ID = 'fake-id';
  const MOCK_USER = generateRandomUser();
  const CURRENT_TIME_STAMP = Date.now().toString();

  server.use(
    graphql.mutation('CreatePost', (req, res, ctx) => {
      const {
        input: { message },
      } = req.variables;

      return res(
        ctx.data({
          createPost: generateRandomPost({
            id: MOCK_POST_ID,
            message,
            author: MOCK_USER,
            createdAt: CURRENT_TIME_STAMP,
          }),
        })
      );
    })
  );

  const { result, waitFor } = renderHook(() => useCreatePost(), {
    wrapper: createReactQueryWrapper(),
  });

  result.current.mutate({ message: MOCK_MESSAGE });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual(
    generateRandomPost({
      id: MOCK_POST_ID,
      message: MOCK_MESSAGE,
      author: MOCK_USER,
      createdAt: CURRENT_TIME_STAMP,
    })
  );
});
