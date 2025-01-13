import styles from "./CityItem.module.css";
import { formatDate } from "../helper/helper";
import { Link } from "react-router-dom";
import { useDeleteCity } from "../features/Cities/useDeleteCity";
import DeleteButton from "./SmallComponents/DeleteButton";

function CityItem({ city }) {
  // const { currentCity } = useCities();

  const { isDeleting, deleteCity } = useDeleteCity();
  const { cityName, emoji, date, id, position } = city;

  function handleRemoveCity(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} `} //${currentCity.id === id ? styles["cityItem--active"] : ""}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <div className={styles.cityInfo}>
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>({formatDate(date)})</time>
        </div>

        <DeleteButton handleDelete={handleRemoveCity} disabled={isDeleting} />
      </Link>
    </li>
  );
}

export default CityItem;
