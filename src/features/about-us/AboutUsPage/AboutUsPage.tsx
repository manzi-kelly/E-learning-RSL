import Link from "next/link";
import ContactDetails from "../../contact/ContactDetails/ContactDetails";
import ContactForm from "../../contact/ContactForm/ContactForm";
import styles from "./AboutUsPage.module.css";

export default function AboutUsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>RSL-ELP · About us</p>
          <h1>About <em>RSL-ELP.</em></h1>
          <p className={styles.lead}>
            RSL-ELP is a Rwanda Sign Language e-learning platform designed to make learning and everyday
            communication more accessible for Deaf and hearing learners.
          </p>
          <nav className={styles.jump} aria-label="About sections">
            <a href="#about">About this website</a>
            <a href="#terms">Terms of use</a>
            <a href="#privacy">Privacy policy</a>
            <a href="#contact">Contact us</a>
          </nav>
        </div>
      </header>

      <div className={styles.inner}>
        <section id="about" tabIndex={-1} aria-labelledby="about-title" className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.index}>01</p>
            <h2 id="about-title">About this website</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>
              RSL-ELP brings together the main parts of learning Rwanda Sign Language in one place. You can
              explore planned courses, look up vocabulary in the digital dictionary, and understand where
              interpreting support can help in daily life.
            </p>
            <p>
              The platform is built around clear visual communication. Lessons use video demonstrations with
              captions and written explanations, so information is available without relying on sound. The
              same approach guides the dictionary and the interpreting information.
            </p>
            <p className={styles.note}>
              This site is currently a preview. Enrolment, accounts, approved lesson videos and live
              interpreting requests are not yet available.
            </p>
            <Link className={styles.action} href="/ways-to-learn">
              Explore the learning options <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section id="terms" tabIndex={-1} aria-labelledby="terms-title" className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.index}>02</p>
            <h2 id="terms-title">Terms of use</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>
              By browsing RSL-ELP, you agree to these simple terms for using the site.
            </p>
            <ul className={styles.list} role="list">
              <li>
                <strong>Educational preview.</strong> Courses, vocabulary and service information are shown
                for planning and demonstration. Enrolment and accounts are not open.
              </li>
              <li>
                <strong>Sample content.</strong> Form previews check what you type in your browser. They do
                not create accounts, send messages or book interpreters.
              </li>
              <li>
                <strong>Respectful use.</strong> Do not misuse the content, copy it elsewhere without
                permission, or try to interfere with how the site works.
              </li>
              <li>
                <strong>Changing service.</strong> Content, design and availability may be updated as the
                platform is developed.
              </li>
              <li>
                <strong>Other pages.</strong> When live services are added, their own terms may apply in
                addition to these.
              </li>
            </ul>
          </div>
        </section>

        <section id="privacy" tabIndex={-1} aria-labelledby="privacy-title" className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.index}>03</p>
            <h2 id="privacy-title">Privacy policy</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>
              We keep privacy simple while RSL-ELP is in preview.
            </p>
            <ul className={styles.list} role="list">
              <li>
                <strong>No accounts yet.</strong> You are not asked to create an account or sign in to browse
                the site.
              </li>
              <li>
                <strong>Preview forms.</strong> The contact, interpreting and account forms validate entries
                in your browser only. Nothing is sent to a server or stored by these previews.
              </li>
              <li>
                <strong>No payments.</strong> Payment details are not collected because payments are not
                available.
              </li>
              <li>
                <strong>Contact details.</strong> Official email, telephone and operating hours are awaiting
                Management confirmation and will be published when confirmed.
              </li>
              <li>
                <strong>Future updates.</strong> If live features are introduced, this page will explain what
                information is collected and why.
              </li>
            </ul>
          </div>
        </section>

        <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.index}>04</p>
            <h2 id="contact-title">Contact us</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>
              For questions about Rwanda Sign Language learning or platform services, check the contact
              details below or open the contact page. The form is a preview that checks your entries in the
              browser; it does not send a message yet.
            </p>
            <div className={styles.contactGrid}>
              <ContactDetails />
              <ContactForm />
            </div>
            <Link className={styles.action} href="/contact">
              Open the contact page <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
