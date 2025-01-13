import styles from "./DeleteButton.module.css";

function DeleteButton({ handleDelete, disabled = false }) {
  return (
    <button
      className={styles.deleteBtn}
      onClick={handleDelete}
      disabled={disabled}
    >
      &times;
    </button>
  );
}

export default DeleteButton;
