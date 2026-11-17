import Brand from "../Brand";
import MobileNav from "./MobileNav";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main-content">Skip to content</a>
      <div className={styles.inner}>
        <Brand />
        <MobileNav />
      </div>
    </header>
  );
}
