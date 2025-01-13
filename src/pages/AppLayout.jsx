import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";

function AppLayout() {
  return (
    <main className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </main>
  );
}

export default AppLayout;
