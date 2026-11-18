import Link from "next/link";
import Brand from "../Brand";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/dictionary", label: "Digital Dictionary" },
      { href: "/resources", label: "Learning Resources" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/interpreting", label: "Interpreting Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/community", label: "Community" },
      { href: "/blog", label: "Blog & News" },
      { href: "/about-us", label: "About us" },
    ],
  },
];

async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.overview}>
            <Brand />
            <p>
              Visual Rwanda Sign Language learning for more inclusive
              communication.
            </p>
            <Link href="/courses" className={styles.cta}>
              Start learning
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {columns.map((column) => {
            const id = `footer-${column.title.toLowerCase()}`;
            return (
              <nav
                key={column.title}
                className={styles.column}
                aria-labelledby={id}
              >
                <h2 id={id} className={styles.heading}>
                  {column.title}
                </h2>
                <ul role="list">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {year} All rights reserved by{" "}
            <strong>Rwanda Sign Language</strong>.
          </p>
          <p className={styles.powered}>
            Powered by <strong>Manzi Kelly</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}