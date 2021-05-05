import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import wrapper from '../../test/wrapper';
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
  const { result, waitFor } = renderHook(() => usePosts(), { wrapper });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual(POSTS);
});

test('should get errors', async () => {
  server.use(
    graphql.query('Posts', (_req, res, ctx) => {
      return res(ctx.status(500, 'There is Error'));
    })
  );

  const { result, waitFor } = renderHook(() => usePosts(), { wrapper });

  await waitFor(() => result.current.isError);

  // expect isError will be true, but it's false
  // expect isSuccess is false but it's true, and receive the mockPosts
  console.log(result.current);

  expect(result.current.error).toEqual('There is Error');
});
