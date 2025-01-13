import { Timestamp } from "firebase/firestore"; // Correct import for Firestore Timestamp

const formatDate = (timestamp) => {
  let date =
    timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export { formatDate };
