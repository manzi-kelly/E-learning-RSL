import Link from "next/link";
import Brand from "../Brand";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.overview}>
          <Brand />
          <p>Visual Rwanda Sign Language learning for more inclusive communication.</p>
        </div>
        <nav className={styles.nav} aria-label="Footer">
          <ul role="list">
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/dictionary">Digital Dictionary</Link></li>
            <li><Link href="/interpreting">Interpreting Services</Link></li>
            <li><Link href="/resources">Learning Resources</Link></li>
            <li><Link href="/community">Community</Link></li>
            <li><Link href="/blog">Blog &amp; News</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className={styles.planned}>
          <p>Planned pages</p>
          <ul role="list">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
