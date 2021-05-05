import { renderHook } from '@testing-library/react-hooks';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import createReactQueryWrapper from '../../test/reactQueryWrapper';
import usePost from '../usePost';

// mocks
import { generateRandomPost, generateRandomUser } from '../../__mocks__';

const USER = generateRandomUser();
const CURRENT_TIME_STAMP = Date.now().toString();

const server = setupServer(
  graphql.query('Post', (req, res, ctx) => {
    const { input } = req.variables;

    return res(
      ctx.data({
        post: generateRandomPost({
          id: input,
          author: USER,
          createdAt: CURRENT_TIME_STAMP,
        }),
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

test('should get post', async () => {
  const fakePostId = 'fake-id';

  const { result, waitFor } = renderHook(() => usePost(fakePostId), {
    wrapper: createReactQueryWrapper(),
  });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual(
    generateRandomPost({
      id: fakePostId,
      author: USER,
      createdAt: CURRENT_TIME_STAMP,
    })
  );
});
