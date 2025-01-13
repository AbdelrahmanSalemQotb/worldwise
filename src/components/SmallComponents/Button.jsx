import styles from "./Button.module.css";

function Button({ style, onClick, type = null, children }) {
  return (
    <button
      className={`${styles.btn} ${styles[style]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
