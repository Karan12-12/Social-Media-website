import { useState } from 'react';
import { usePosts } from '../hooks';
import { Link } from 'react-router-dom';
import React from 'react';
import { useToasts } from 'react-toast-notifications';
import Comment from './Comment';
import styles from '../styles/home.module.css';
import { createComment, toggleLike } from '../api';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        addToast('comment created successfully', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }
      setCreatingComment(false);
    }
  };

  const handlePostLikeClcik = async () => {
    const response = await toggleLike(post._id, 'Post');

    if (response.success) {
      if (response.data.deleted) {
        addToast('like removed successfully', {
          appearance: 'success',
        });
      } else {
        addToast('like added successfully', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <React.Fragment key={post.id}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/236/236832.png"
              alt="user-pic"
            />
            <div>
              <Link
                to={`/user/${post.user._id}`}
                state={{ user: post.user }}
                className={styles.postAuthor}
              >
                {post.user.name}
              </Link>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <button onClick={handlePostLikeClcik}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
                  alt="likes-icon"
                />
              </button>
              <span>{post.likes.length}</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input
              placeholder="Start typing a comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onKeyDown={handleAddComment}
            />
          </div>

          <div className={styles.postCommentsList}>
            {post.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Post;
