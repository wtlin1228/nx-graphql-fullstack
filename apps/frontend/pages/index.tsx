import * as React from 'react';

// components
import PaginatedPosts from '../src/components/PaginatedPosts';
import Posts from '../src/components/Posts';
import CreatePostForm from '../src/components/CreatePostForm';
import InfinitePosts from '../src/components/InfinitePosts';

// hooks
import { fetchPaginatedPosts } from '../src/hooks/usePaginatedPosts';

enum DemoType {
  Paginated = 'Paginated',
  All = 'All',
  Infinite = 'Infinite',
}

export const getServerSideProps = async () => {
  const posts = await fetchPaginatedPosts(1);
  return {
    props: {
      posts,
    },
  };
};

export function Index({ posts }) {
  const [demoType, setDemoType] = React.useState<DemoType>(DemoType.Paginated);

  return (
    <div>
      {Object.values(DemoType).map((value) => (
        <button
          key={value}
          onClick={() => setDemoType(value)}
          disabled={demoType === value}
        >
          {value}
        </button>
      ))}

      <div>
        {demoType === DemoType.Paginated ? (
          <PaginatedPosts initialData={posts} />
        ) : null}
        {demoType === DemoType.All ? (
          <div style={{ display: 'grid', gridTemplateColumns: '400px auto' }}>
            <Posts />
            <CreatePostForm />
          </div>
        ) : null}
        {demoType === DemoType.Infinite ? <InfinitePosts /> : null}
      </div>
    </div>
  );
}

export default Index;
