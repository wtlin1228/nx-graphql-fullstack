import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { server } from '../../tests/setupTests';
import createReactQueryWrapper from '../../tests/createReactQueryWrapper';
import useInfinitePosts from '../useInfinitePosts';

// mocks
import { generateRandomPost } from '../../__mocks__';

const generateMockedResponse = (page) => {
  const offset = (page - 1) * 10;
  return Array.from({ length: 10 }, (_, i: number) =>
    generateRandomPost({
      message: `Post ${i + offset + 1}`,
    })
  );
};

test('should get infinite posts', async () => {
  const MOCK_INFINITE_POSTS = Array.from({ length: 3 }, (_, i: number) => ({
    nextPage: i + 2,
    posts: generateMockedResponse(i + 1),
  }));

  server.use(
    graphql.query('InfinitePosts', (req, res, ctx) => {
      const { input: page } = req.variables;

      return res(
        ctx.data({
          posts: MOCK_INFINITE_POSTS[page - 1].posts,
        })
      );
    })
  );

  const { result, waitFor } = renderHook(() => useInfinitePosts(), {
    wrapper: createReactQueryWrapper(),
  });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data.pages).toStrictEqual([MOCK_INFINITE_POSTS[0]]);

  // fetch the second page
  result.current.fetchNextPage();

  await waitFor(() => result.current.isFetching);
  await waitFor(() => !result.current.isFetching);

  expect(result.current.data.pages).toStrictEqual([
    MOCK_INFINITE_POSTS[0],
    MOCK_INFINITE_POSTS[1],
  ]);

  // fetch the third page
  result.current.fetchNextPage();

  await waitFor(() => result.current.isFetching);
  await waitFor(() => !result.current.isFetching);

  expect(result.current.data.pages).toStrictEqual([
    MOCK_INFINITE_POSTS[0],
    MOCK_INFINITE_POSTS[1],
    MOCK_INFINITE_POSTS[2],
  ]);
});
