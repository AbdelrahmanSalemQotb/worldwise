import { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/SmallComponents/Button";
import PageNav from "../components/SmallComponents/PageNav";
import Spinner from "../components/SmallComponents/Spinner";
import SpinnerMini from "../components/SmallComponents/SpinnerMini";
import { useGoogleLogin } from "../features/user/useGoogleLogin";
import { useLogin } from "../features/user/useLogin";
import { useUser } from "../features/user/useUser";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { isLoadingUser, user, isAuthenticated } = useUser();
  const { login, isLoadingLogin } = useLogin();
  const { googleLogin, isLoadingGoogle } = useGoogleLogin();

  const isLoading = isLoadingLogin || isLoadingGoogle || isLoadingUser;

  function handleUserSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setLocalError("Please enter email and password");
      return;
    }
    login({ email, password });
  }

  if (isLoadingUser) return <Spinner />;
  if (user && isAuthenticated) return <Navigate to="/app" replace />;

  return (
    <main className={styles.page}>
      <PageNav />

      <form className={styles.form} onSubmit={handleUserSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            autoComplete="email"
            placeholder="Email address"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            autoComplete="current-password"
            placeholder="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {localError && <p className={styles.error}>{localError}</p>}

        <div className={styles["button-group"]}>
          <Button style="primary">
            {isLoading ? <SpinnerMini /> : "Login"}
          </Button>

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
                Sign in with Google
              </span>
            </div>
          </button>
        </div>
      </form>
    </main>
  );
}
