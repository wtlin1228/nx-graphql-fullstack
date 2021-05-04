import * as React from 'react';
import Link from 'next/link';

// hooks
import useInfinitePosts from '../hooks/useInfinitePosts';

// types
import type { Post } from '@nx-graphql-fullstack/util-graphql-interface';

const InfinitePosts = () => {
  const infinitePostsQuery = useInfinitePosts();

  return (
    <div>
      <h1>Posts {infinitePostsQuery.isFetching ? 'updating...' : null}</h1>
      <div>
        {infinitePostsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {infinitePostsQuery.data.pages.map((group, i) => (
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
        <button onClick={() => infinitePostsQuery.fetchNextPage()}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default InfinitePosts;
