import * as React from 'react';
import Link from 'next/link';
import { NetworkStatus } from '@apollo/client';

// hooks
import usePosts from '../hooks/usePosts';
import useUpdatePost from '../hooks/useUpdatePost';

// types
import { Post } from '@nx-graphql-fullstack/util-graphql-interface';

const Posts = () => {
  const [editingPostId, setEditingPostId] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const postsQuery = usePosts();
  const [updatePost] = useUpdatePost();

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
                  {editingPostId === post.id ? (
                    <>
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          updatePost({
                            variables: {
                              input: { id: editingPostId, message },
                            },
                            optimisticResponse: {
                              updatePost: {
                                id: editingPostId,
                                __typename: 'Post',
                                message,
                                author: {
                                  email: post.author.email,
                                },
                              },
                            },
                          });
                          setEditingPostId(null);
                          setMessage('');
                        }}
                      >
                        <span role="img" aria-label="confirm">
                          ✅
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setEditingPostId(null);
                          setMessage('');
                        }}
                      >
                        <span role="img" aria-label="cancel">
                          ❎
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/[postId]" as={`/${post.id}`}>
                        <a href={`/${post.id}`}>{post.message}</a>
                      </Link>
                      <button
                        onClick={() => {
                          setEditingPostId(post.id);
                          setMessage(post.message);
                        }}
                        style={{ marginLeft: 10 }}
                      >
                        Edit
                      </button>
                    </>
                  )}
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
