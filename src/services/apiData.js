import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getCitiesApi(uid) {
  if (!uid) throw new Error("User is missing");

  const citiesCollectionRef = collection(db, "users", uid, "cities");
  const querySnapshot = await getDocs(citiesCollectionRef);

  const loadedCities = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    date: doc.data().date.toDate(),
    ...doc.data(),
  }));
  return loadedCities;
}

export async function getCityApi({ uid, cityId }) {
  if (!uid || !cityId) throw new Error("User id or cityId is missing");

  const cityDocRef = doc(db, "users", uid, "cities", cityId);

  const cityDocSnap = await getDoc(cityDocRef);

  if (!cityDocSnap.exists()) {
    throw new Error("City not found");
  }

  const cityData = cityDocSnap.data();
  const city = {
    id: cityDocSnap.id,
    date: cityData.date.toDate(),
    ...cityData,
  };

  return city;
}

export async function addCityApi({ uid, city }) {
  if (!uid) throw new Error("User id is missing");

  const citiesCollectionRef = collection(db, "users", uid, "cities");
  const cityDocRef = await addDoc(citiesCollectionRef, city);
  const userDate = Timestamp.fromDate(city.date);

  const newCity = { ...city, id: cityDocRef.id, date: userDate };

  return newCity;
}

export async function deleteCityApi({ uid, cityId }) {
  if (!uid || !cityId) throw new Error("User id or cityId is missing");

  const cityDocRef = doc(db, "users", uid, "cities", cityId);
  await deleteDoc(cityDocRef);
}

export async function getCityDetailsApi({ lat, lng }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  );
  const data = await res.json();

  if (!data?.countryCode)
    throw new Error("That doesn't seem to be a city. Click somewhere else 😉");

  return {
    cityName: data.city || data.locality || "",
    country: data.countryName,
    emoji: data.countryCode,
  };
}
