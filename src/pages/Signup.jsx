import { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/SmallComponents/Button";
import PageNav from "../components/SmallComponents/PageNav";
import styles from "./Signup.module.css";
import { useSignup } from "../features/user/useSignup";
import { useGoogleLogin } from "../features/user/useGoogleLogin";
import { useUser } from "../features/user/useUser";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [fullName, setFullName] = useState("");

  const { signup } = useSignup();
  const { googleLogin } = useGoogleLogin();
  const { user, isAuthenticated } = useUser();

  function handleSignUpSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
    } else if (email && password && confirmPassword && fullName) {
      signup({ email, password, fullName });
    } else {
      setLocalError("Please enter email and password");
    }
  }
  if (user && isAuthenticated) return <Navigate to="/app" replace />;

  return (
    <main className={styles.page}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSignUpSubmit}>
        <div className={styles.row}>
          <label htmlFor="fullName">Full name</label>
          <input
            required
            type="text"
            id="fullName"
            autoComplete="name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            required
            type="email"
            id="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            required
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        {localError && <p className={styles.error}>{localError}</p>}

        <div className={styles["button-group"]}>
          <Button style={"primary"}>Sign Up</Button>
          <button
            type="button"
            className="gsi-material-button"
            onClick={googleLogin}
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <img src="/google-login.svg" alt="Google logo" />
              </div>
              <span className="gsi-material-button-contents">
                Sign up with Google
              </span>
            </div>
          </button>
        </div>
      </form>
    </main>
  );
}
