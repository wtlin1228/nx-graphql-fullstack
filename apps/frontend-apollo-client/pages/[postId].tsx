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
      {postQuery.loading || !postQuery.data ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h3>Message: {postQuery.data.post.message}</h3>
          <p>
            <small>Post ID: {postQuery.data.post.id}</small>
          </p>
          <Link href="/" as="/">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default Post;
