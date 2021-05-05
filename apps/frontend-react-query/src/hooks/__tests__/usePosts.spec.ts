import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import createReactQueryWrapper from '../../test/reactQueryWrapper';
import usePosts from '../usePosts';

// mocks
import { generateRandomPost } from '../../__mocks__';

const POSTS = Array.from({ length: 2 }, generateRandomPost);

const server = setupServer(
  graphql.query('Posts', (_req, res, ctx) => {
    return res(
      ctx.data({
        posts: POSTS,
      })
    );
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test('should get posts', async () => {
  const { result, waitFor } = renderHook(() => usePosts(), {
    wrapper: createReactQueryWrapper(),
  });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual(POSTS);
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
