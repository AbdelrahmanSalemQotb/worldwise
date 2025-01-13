import { Outlet } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import Logo from "./SmallComponents/Logo";

function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <button className={styles.toggleButton} onClick={() => toggleSidebar()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
          }}
        >
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            style={{
              transform: isOpen ? "rotate(45deg) translate(0, 0)" : "none",
              opacity: isOpen ? 0 : 1,
            }}
          />
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            style={{
              transform: isOpen ? "rotate(45deg) translate(0, 6px)" : "none",
            }}
          />
          <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            style={{
              transform: isOpen ? "rotate(-45deg) translate(0, -6px)" : "none",
            }}
          />
        </svg>
      </button>

      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={() => toggleSidebar()}
      ></div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <Logo />
        <AppNav />
        <Outlet />
        <footer className={styles.footer}>
          <p className={styles.copyright}>
            © Copyright <span>{new Date().getFullYear()}</span> by WorldWise
            Inc.
          </p>
        </footer>
      </div>
    </>
  );
}

export default Sidebar;
