import PageNav from "../components/SmallComponents/PageNav";
import Button from "../components/SmallComponents/Button";
import styles from "./ErrorFallback.module.css";
export default function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div className={styles.page}>
      <PageNav />
      <div className={styles.container} role="alert">
        <h1>Something went wrong..</h1>
        <pre className={styles.errorMessage}>{error.message}</pre>

        <div className={styles.buttonGroup}>
          <Button onClick={resetErrorBoundary} style="primary">
            Try again
          </Button>

          <Button onClick={() => (window.location.href = "/")} style="back">
            &larr; Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
