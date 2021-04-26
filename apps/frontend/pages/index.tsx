import * as React from 'react';

// components
import PaginatedPosts from '../src/components/PaginatedPosts';
import Posts from '../src/components/Posts';
import CreatePostForm from '../src/components/CreatePostForm';

enum DemoType {
  Paginated,
  All,
  Infinite,
}

export function Index() {
  const [demoType, setDemoType] = React.useState<DemoType>(DemoType.Paginated);

  return (
    <div>
      <button
        onClick={() => setDemoType(DemoType.Paginated)}
        disabled={demoType === DemoType.Paginated}
      >
        Paginated
      </button>
      <button
        onClick={() => setDemoType(DemoType.All)}
        disabled={demoType === DemoType.All}
      >
        All
      </button>
      <button
        onClick={() => setDemoType(DemoType.Infinite)}
        disabled={demoType === DemoType.Infinite}
      >
        Infinite
      </button>
      <div>
        {demoType === DemoType.Paginated ? <PaginatedPosts /> : null}
        {demoType === DemoType.All ? (
          <div style={{ display: 'grid', gridTemplateColumns: '400px auto' }}>
            <Posts />
            <CreatePostForm />
          </div>
        ) : null}
        {demoType === DemoType.Infinite ? <>Not implemented yet</> : null}
      </div>
    </div>
  );
}

export default Index;
