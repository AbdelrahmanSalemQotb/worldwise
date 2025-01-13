import { useNavigate } from "react-router-dom";
import { useCity } from "../features/Cities/useCity";
import { useDeleteCity } from "../features/Cities/useDeleteCity";
import { formatDate } from "../helper/helper";
import styles from "./City.module.css";
import BackButton from "./SmallComponents/BackButton";
import DeleteButton from "./SmallComponents/DeleteButton";
import Message from "./SmallComponents/Message";
import Spinner from "./SmallComponents/Spinner";

function City() {
  const { city = {}, isLoading, error } = useCity();
  const navigate = useNavigate();

  const { cityName, emoji, date, notes, id } = city;
  const { isDeleting, deleteCity } = useDeleteCity();

  let markup = (
    <div className={styles.city}>
      <div className={styles.header}>
        <div className={styles.row}>
          <h6>City name</h6>

          <h3>
            <span>{emoji}</span> {cityName}
          </h3>
        </div>
        <DeleteButton handleDelete={handleDeleteCity} disabled={isDeleting} />
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
    </div>
  );
  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
    navigate("/app/cities", { replace: true });
  }

  if (isLoading) markup = <Spinner />;
  if (error) markup = <Message message={error.message} />;

  return (
    <>
      {markup}
      <div>
        <BackButton />
      </div>
    </>
  );
}
export default City;
