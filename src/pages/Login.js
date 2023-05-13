import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLogginIn] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogginIn(true);

    if (!email || !password) {
      return addToast('please enter both email and password', {
        appearance: 'error',
      });
    }

    const response = await auth.login(email, password);
    if (response.success) {
      addToast('successfully logged in', {
        appearance: 'success',
      });
      setLogginIn(false);
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };
  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </form>
  );
};
export default Login;
