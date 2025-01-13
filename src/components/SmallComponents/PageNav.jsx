import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <button
        className={styles.menuButton}
        onClick={(e) => {
          document
            .querySelector(`.${styles.navList}`)
            .classList.toggle(styles.hidden);
          e.currentTarget.classList.toggle(styles.active);
        }}
      >
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <ul className={`${styles.navList} ${styles.hidden}`}>
        <li>
          <NavLink className={styles.NavLink} to={"/pricing"}>
            Pricing
          </NavLink>
        </li>

        <li>
          <NavLink className={styles.NavLink} to="/product">
            Product
          </NavLink>
        </li>

        <li>
          <NavLink
            className={`${styles.NavLink} ${styles.ctaLink} `}
            to="/signup"
          >
            Sign up
          </NavLink>
        </li>

        <li>
          <NavLink className={`${styles.NavLink}`} to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
