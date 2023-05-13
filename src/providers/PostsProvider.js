import { createContext } from 'react';
import { useProviderPosts } from '../hooks';

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
  addComment: () => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const Posts = useProviderPosts();

  return (
    <PostsContext.Provider value={Posts}>{children}</PostsContext.Provider>
  );
};
