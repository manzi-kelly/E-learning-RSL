import Announcements from "../Announcements/Announcements";
import Discussions from "../Discussions/Discussions";
import PeerSupport from "../PeerSupport/PeerSupport";
import styles from "./CommunityPage.module.css";

export default function CommunityPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.inner}>
          <h1>RSL-ELP <em>Community</em></h1>
          <p>A space intended to support shared learning and accessible communication among people learning Rwanda Sign Language.</p>
        </div>
      </header>
      <div className={`${styles.inner} ${styles.sections}`}>
        <Discussions />
        <PeerSupport />
        <Announcements />
      </div>
    </div>
  );
}
