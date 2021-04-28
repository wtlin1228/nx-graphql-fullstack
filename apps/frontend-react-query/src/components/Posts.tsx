import * as React from 'react';
import Link from 'next/link';

// hooks
import usePosts from '../hooks/usePosts';

// types
import { Post } from '@nx-graphql-fullstack/util-graphql-interface';

const Posts = () => {
  const postsQuery = usePosts();

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? 'updating...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map((post: Post) => {
              return (
                <li key={post.id}>
                  <Link href="/[postId]" as={`/${post.id}`}>
                    <a href={`/${post.id}`}>{post.message}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Posts;
