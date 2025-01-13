import { useState } from "react";
import { useUser } from "../features/user/useUser";
import { useLogout } from "../features/user/useLogout";
import styles from "./User.module.css";

function User() {
  const { user } = useUser();
  const { logout } = useLogout();
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleClick() {
    logout();
  }

  function handleToggle() {
    if (window.innerWidth <= 1047) {
      setIsCollapsed((isCollapsed) => !isCollapsed);
    }
  }
  return (
    <div
      className={`${styles.user} ${isCollapsed ? styles.collapsed : ""}`}
      onClick={handleToggle}
    >
      <svg
        className={styles.arrow}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <img
        src={user.photoURL || "/default-user.jpg"}
        alt={user.name}
        onError={(e) => (e.target.src = "/default-user.jpg")}
        referrerPolicy="no-referrer"
      />
      <span>{user.displayName}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default User;
