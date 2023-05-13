import styles from '../styles/home.module.css';
import Post from '../components/Post';
import Loader from '../components/Loader';

import React from 'react';
import { useAuth, usePosts } from '../hooks';
import FriendsList from '../components/FriendsList';
import CreatePost from '../components/CreatePost';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
