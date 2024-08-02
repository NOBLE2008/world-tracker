import { useEffect, useState } from 'react';
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import PageNav from '../components/PageNav';
import { useAuth } from '../context/AuthContext';


export default function Login() {
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempted, setAttempted] = useState(false);

  // TODO: Add validation and handle login logic
  const {login, authenticated} = useAuth()
  const handleSubmit = (e) => {
    // TODO: Implement login logic here
    e.preventDefault()
    login({email, password})
    setAttempted(true)
  }

  useEffect(() => {
    if(!authenticated && attempted) {
      alert('Incorrect Email or password')
      setAttempted(false)
      return;
    }
    if(authenticated) navigate('/app')
  }, [authenticated, navigate, attempted])

  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Link className='cta' onClick={handleSubmit}>Login</Link>
        </div>
      </form>
    </main>
  );
}
