import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { server } from '../../tests/setupTests';
import createReactQueryWrapper from '../../tests/createReactQueryWrapper';
import usePost from '../usePost';

// mocks
import { generateRandomPost, generateRandomUser } from '../../__mocks__';

test('should get post', async () => {
  const MOCK_POST_ID = 'fake-id';
  const MOCK_USER = generateRandomUser();
  const CURRENT_TIME_STAMP = Date.now().toString();

  server.use(
    graphql.query('Post', (req, res, ctx) => {
      const { input } = req.variables;

      return res(
        ctx.data({
          post: generateRandomPost({
            id: input,
            author: MOCK_USER,
            createdAt: CURRENT_TIME_STAMP,
          }),
        })
      );
    })
  );

  const { result, waitFor } = renderHook(() => usePost(MOCK_POST_ID), {
    wrapper: createReactQueryWrapper(),
  });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual(
    generateRandomPost({
      id: MOCK_POST_ID,
      author: MOCK_USER,
      createdAt: CURRENT_TIME_STAMP,
    })
  );
});
