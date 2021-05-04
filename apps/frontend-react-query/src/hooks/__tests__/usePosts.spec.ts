import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import wrapper from '../../test/wrapper';
import usePosts from '../usePosts';

const mockPosts = [
  {
    message: 'Post 1',
    author: {
      email: '-e1uxQe0vezIwRE5cfSIn',
    },
    id: '3Wa0_kWdPiO9b4kern4uv',
  },
  {
    message: 'Post 2',
    author: {
      email: '-e1uxQe0vezIwRE5cfSIn',
    },
    id: 'pi_MSRZVwicgSSWqPM_wv',
  },
];

const server = setupServer(
  graphql.query('Posts', (req, res, ctx) => {
    return res(
      ctx.data({
        posts: mockPosts,
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

  expect(result.current.data).toEqual(mockPosts);
});

test('should get errors', async () => {
  server.use(
    graphql.query('Posts', (req, res, ctx) => {
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
