import { Link } from "react-router-dom";
import PageNav from "../components/SmallComponents/PageNav";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.page}>
      <PageNav />
      <div className={styles.container} role="alert">
        <h1>Page not found 😢</h1>
        <Link to="/" className={styles.link}>
          &larr; Go home
        </Link>
      </div>
    </div>
  );
}
