import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
import Message from "./SmallComponents/Message";
import Spinner from "./SmallComponents/Spinner";
import { useCities } from "../features/Cities/useCities";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce(
    (arr, city) =>
      arr.map((city) => city.country).includes(city.country)
        ? arr
        : [...arr, { emoji: city.emoji, country: city.country }],
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
