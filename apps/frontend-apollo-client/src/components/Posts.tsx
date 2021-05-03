import * as React from 'react';
import Link from 'next/link';
import { NetworkStatus } from '@apollo/client';

// hooks
import usePosts from '../hooks/usePosts';

// types
import { Post } from '@nx-graphql-fullstack/util-graphql-interface';

const Posts = () => {
  const postsQuery = usePosts();

  const isPolling = postsQuery.networkStatus === NetworkStatus.poll;

  return (
    <div>
      <h1>Posts {isPolling ? '...' : ''}</h1>
      <button onClick={() => postsQuery.refetch()}>Refetch!</button>
      <div>
        {postsQuery.loading && !isPolling ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.posts.map((post: Post) => {
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
