import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { server } from '../../tests/setupTests';
import createReactQueryWrapper from '../../tests/createReactQueryWrapper';
import usePaginatedPosts from '../usePaginatedPosts';

// mocks
import { generateRandomPost } from '../../__mocks__';

test('should get paginated posts', async () => {
  server.use(
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

  const { result, waitFor } = renderHook(() => usePaginatedPosts(1), {
    wrapper: createReactQueryWrapper(),
  });

  // because usePaginatedPosts have initialData, the default isSuccess = true
  await waitFor(() => result.current.isFetching);
  await waitFor(() => !result.current.isFetching);

  expect(result.current.data.length).toEqual(10);
});
