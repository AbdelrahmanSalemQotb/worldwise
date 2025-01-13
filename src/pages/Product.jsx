import PageNav from "../components/SmallComponents/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.page}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            WorldWise is your personal travel companion that helps you track and
            remember all the amazing places you&apos;ve visited around the
            globe. With an interactive map interface and intuitive city
            management, you can build a beautiful visual diary of your worldwide
            adventures.
          </p>
          <p>
            Key features include real-time location tracking, custom travel
            notes, date tracking for each visit, and a clean interface to
            organize your cities by country. Whether you&apos;re a frequent
            traveler or just starting your journey, WorldWise helps you create a
            meaningful record of your experiences.
          </p>
        </div>
      </section>
    </main>
  );
}
