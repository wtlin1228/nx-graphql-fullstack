import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import createReactQueryWrapper from '../../test/reactQueryWrapper';
import usePaginatedPosts from '../usePaginatedPosts';

// mocks
import { generateRandomPost } from '../../__mocks__';

const server = setupServer(
  graphql.query('PaginatedPosts', (req, res, ctx) => {
    const { input: page } = req.variables;
    const offset = (page - 1) * 10;
    const posts = Array.from({ length: 10 }, (_, i: number) =>
      generateRandomPost({
        message: `Post ${i + offset + 1}`,
      })
    );

    return res(
      ctx.data({
        posts,
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

test('should get paginated posts', async () => {
  const wrapper = createReactQueryWrapper();
  const { result, waitFor } = renderHook(() => usePaginatedPosts(1), {
    wrapper,
  });

  // because usePaginatedPosts have initialData, the default isSuccess = true
  await waitFor(() => result.current.isFetching);
  await waitFor(() => !result.current.isFetching);

  expect(result.current.data.length).toEqual(10);
});
