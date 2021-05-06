import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { server } from '../../tests/setupTests';
import createReactQueryWrapper from '../../tests/createReactQueryWrapper';
import usePosts from '../usePosts';

// mocks
import { generateRandomPost } from '../../__mocks__';

test('should get posts', async () => {
  const MOCK_POSTS = Array.from({ length: 2 }, generateRandomPost);

  server.use(
    graphql.query('Posts', (_req, res, ctx) => {
      return res(
        ctx.data({
          posts: MOCK_POSTS,
        })
      );
    })
  );

  const { result, waitFor } = renderHook(() => usePosts(), {
    wrapper: createReactQueryWrapper(),
  });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual(MOCK_POSTS);
});

test('should get errors', async () => {
  server.use(
    graphql.query('Posts', (_req, res, ctx) => {
      return res(
        ctx.errors([
          {
            message: 'Oh oh, something went wrong! Q__Q',
          },
        ])
      );
    })
  );

  const { result, waitFor } = renderHook(() => usePosts(), {
    wrapper: createReactQueryWrapper(),
  });

  await waitFor(() => result.current.isError);

  expect(result.current.error).toBeDefined();
});
