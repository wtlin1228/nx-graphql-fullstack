import * as React from 'react';
import Link from 'next/link';

// hooks
import useInfinitePosts from '../hooks/useInfinitePosts';

// types
import type { Post } from '@nx-graphql-fullstack/util-graphql-interface';

const InfinitePosts = () => {
  const { data, isFetching, isLoading, fetchNextPage } = useInfinitePosts();

  return (
    <div>
      <h1>Posts {isFetching ? 'updating...' : null}</h1>
      <div>
        {isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.posts.map((post: Post) => (
                  <li key={post.id}>
                    <Link href="/[postId]" as={`/${post.id}`}>
                      <a href={`/${post.id}`}>{post.message}</a>
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        )}
        <button onClick={() => fetchNextPage()}>Load More</button>
      </div>
    </div>
  );
};

export default InfinitePosts;
