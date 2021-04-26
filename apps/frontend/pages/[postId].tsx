import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import usePost from '../src/hooks/usePost';

export function Post() {
  const {
    query: { postId },
  } = useRouter();

  const postQuery = usePost(String(postId));

  return (
    <div>
      {postQuery.isLoading || !postQuery.data ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h3>
            <Link href="/[postId]" as={`/${postQuery.data.id}`}>
              <a>
                {postQuery.data.message} {postQuery.isFetching ? '...' : null}
              </a>
            </Link>
          </h3>
          <p>
            <small>Post ID: {postQuery.data.id}</small>
          </p>
        </div>
      )}
    </div>
  );
}

export default Post;
