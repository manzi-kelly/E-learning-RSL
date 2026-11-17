import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import styles from "./Brand.module.css";

export default function Brand() {
  const hasLogo = existsSync(join(process.cwd(), "public", "logo.jpeg"));

  return (
    <Link href="/#home" className={styles.brand} aria-label="RSL-ELP home">
      {hasLogo && (
        <span className={styles.logo}>
          <Image src="/logo.jpeg" alt="Rwanda Sign Language E-Learning Platform logo" fill sizes="44px" />
        </span>
      )}
      <span>RSL-ELP</span>
    </Link>
  );
}
