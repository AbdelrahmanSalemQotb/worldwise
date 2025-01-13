// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useAddCity } from "../features/Cities/useAddCity";
import { useGetCityDetails } from "../features/Cities/useGetCityDetails";

import styles from "./Form.module.css";
import BackButton from "./SmallComponents/BackButton";
import Button from "./SmallComponents/Button";
import Message from "./SmallComponents/Message";
import Spinner from "./SmallComponents/Spinner";

function Form() {
  const navigator = useNavigate();
  const [date, setDate] = useState(new Date());

  const { addCity, isLoading } = useAddCity();
  const {
    cityName,
    country,
    emoji,
    lat,
    lng,
    error: geocodingError,
    isLoading: geocodingLoading,
  } = useGetCityDetails();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const cityName = formData.get("cityName");
    const notes = formData.get("notes");

    if (!cityName || !date || !lat || !lng) return;

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat: Number(lat), lng: Number(lng) },
    };

    addCity(newCity);

    navigator("/app/cities");
  }

  if (geocodingLoading) return <Spinner />;
  if (geocodingError)
    return (
      <>
        <Message message={geocodingError.message} />
        <BackButton />
      </>
    );

  if (!lat || !lng) return <Message message="Please select a valid city" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" name="cityName" defaultValue={cityName ?? ""} />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          name="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" name="notes" defaultValue="" />
      </div>

      <div className={styles.buttons}>
        <Button style="primary"> add </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
