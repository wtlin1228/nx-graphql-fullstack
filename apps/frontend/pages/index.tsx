import * as React from 'react';

// components
import PaginatedPosts from '../src/components/PaginatedPosts';
import Posts from '../src/components/Posts';
import CreatePostForm from '../src/components/CreatePostForm';
import InfinitePosts from '../src/components/InfinitePosts';

enum DemoType {
  Paginated = 'Paginated',
  All = 'All',
  Infinite = 'Infinite',
}

export function Index() {
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
        {demoType === DemoType.Paginated ? <PaginatedPosts /> : null}
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
