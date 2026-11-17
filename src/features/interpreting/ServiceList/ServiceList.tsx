import { serviceCategories } from "../data/serviceCategories";
import styles from "./ServiceList.module.css";

export default function ServiceList() {
  return (
    <section className={styles.section} aria-labelledby="service-settings">
      <h2 id="service-settings">Service settings</h2>
      <ul role="list">
        {serviceCategories.map(category => (
          <li key={category.id}><h3>{category.label}</h3><p>{category.description}</p></li>
        ))}
      </ul>
    </section>
  );
}
