import * as React from 'react';
import CreatePostForm from '../src/components/CreatePostForm';
import Posts from '../src/components/Posts';

export function Index() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '400px auto' }}>
      <Posts />
      <CreatePostForm />
    </div>
  );
}

export default Index;
